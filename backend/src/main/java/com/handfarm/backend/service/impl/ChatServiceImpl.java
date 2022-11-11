package com.handfarm.backend.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.handfarm.backend.domain.dto.chat.ChatDetailDto;
import com.handfarm.backend.domain.dto.chat.ChatDto;
import com.handfarm.backend.domain.dto.chat.ChatListViewDto;
import com.handfarm.backend.domain.entity.ChatEntity;
import com.handfarm.backend.domain.entity.ChatInfoEntity;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.repository.ChatInfoRepository;
import com.handfarm.backend.repository.ChatRedisRepository;
import com.handfarm.backend.repository.UserRepository;
import com.handfarm.backend.service.ChatService;
import com.handfarm.backend.service.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChatServiceImpl implements ChatService {

    private final UserRepository userRepository;
    private final ChatInfoRepository chatInfoRepository;
    private final RedisTemplate<String, ChatEntity> redisTemplate;
    private final KakaoService kakaoService;
    private final ChatRedisRepository chatRedisRepository;

    @Autowired
    ChatServiceImpl(ChatInfoRepository chatInfoRepository, UserRepository userRepository, RedisTemplate<String, ChatEntity> redisTemplate, KakaoService kakaoService, ChatRedisRepository chatRedisRepository){
        this.userRepository = userRepository;
        this.chatInfoRepository = chatInfoRepository;
        this.redisTemplate = redisTemplate;
        this.kakaoService = kakaoService;
        this.chatRedisRepository = chatRedisRepository;
    }

    @Override
    public List<ChatListViewDto> getChatList(HttpServletRequest request) { // 채팅 목록 조회
        UserEntity user = getUserEntity(request);
        String userId = user.getUserId();
        List<ChatInfoEntity> chatInfoList = chatInfoRepository.findByUserChatInfo(user);

        if (!chatInfoList.isEmpty()) {
            List<ChatListViewDto> chatList = new ArrayList<>();
            for (ChatInfoEntity c : chatInfoList) {
                String roomId = String.valueOf(c.getIdx());
                Object chatInfo = redisTemplate.opsForList().index(String.valueOf(c.getIdx()), 0);
                if(chatInfo != null) {
                    ObjectMapper mapper = new ObjectMapper();
                    mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // timestamp 형식 안따르도록 설정
                    mapper.registerModules(new JavaTimeModule(), new Jdk8Module());
                    ChatEntity chatEntity = mapper.convertValue(chatInfo, ChatEntity.class);
                    ChatInfoEntity chatRoomInfo = chatInfoRepository.findByIdx(Integer.valueOf(roomId));

                    UserEntity personA = chatRoomInfo.getPersonA();
                    UserEntity personB = chatRoomInfo.getPersonB();
                    if (personA.getUserId().equals(userId)) {
                        ChatListViewDto chatListViewDto = ChatListViewDto.builder().roomId(chatEntity.getRoomId()).anotherUserNickname(personB.getUserNickname())
                                .content(chatEntity.getMsg()).time(chatEntity.getTime()).anotherUserProfileImg(personB.getUserProfile()).build();
                        chatList.add(chatListViewDto);
                    } else {
                        ChatListViewDto chatListViewDto = ChatListViewDto.builder().roomId(chatEntity.getRoomId()).anotherUserNickname(personA.getUserNickname())
                                .content(chatEntity.getMsg()).time(chatEntity.getTime()).anotherUserProfileImg(personA.getUserProfile()).build();
                        chatList.add(chatListViewDto);
                    }
                }else{
                    continue;
                }
            }

            return chatList;
        }

        return new ArrayList<>();
    }

    @Override
    public List<ChatDetailDto> getChatDetail(HttpServletRequest request, String roomId) { // 채팅 내용 상세 조회
        List<ChatDetailDto> chatList = new ArrayList<>();
        List<ChatEntity> chat = redisTemplate.opsForList().range(roomId, 0, redisTemplate.opsForList().size(roomId));

        if(chat.isEmpty()){
            // 채팅방 없음. 빈배열 생성
            return new ArrayList<>();
        }else{
            for(int i=0; i<chat.size(); i++){
                Object chatObject = chat.get(i);

                ObjectMapper mapper = new ObjectMapper();
                mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // timestamp 형식 안따르도록 설정
                mapper.registerModules(new JavaTimeModule(), new Jdk8Module());
                ChatEntity chatEntity = mapper.convertValue(chatObject, ChatEntity.class);

                Optional<UserEntity> sendUser = userRepository.findByUserId(chatEntity.getSendUserId());
                Optional<UserEntity> toUser = userRepository.findByUserId(chatEntity.getToUserId());
                if(sendUser.isPresent() && toUser.isPresent()) {
                    ChatDetailDto chatDetailDto = ChatDetailDto.builder()
                            .sendUserNickname(sendUser.get().getUserNickname())
                            .toUserNickname(toUser.get().getUserNickname())
                            .msg(chatEntity.getMsg())
                            .time(chatEntity.getTime())
                            .isRead(chatEntity.getIsRead())
                            .build();

                    chatList.add(chatDetailDto);
                }
            }
        }


        return chatList;
    }

    @Override
    public UserEntity getToUser(HttpServletRequest request, String roomId) {
        UserEntity user = getUserEntity(request);
        String userId = user.getUserId();
        ChatInfoEntity chatRoomInfo = chatInfoRepository.findByIdx(Integer.valueOf(roomId));

        UserEntity personA = chatRoomInfo.getPersonA();
        UserEntity personB = chatRoomInfo.getPersonB();
        if (personA.getUserId().equals(userId)) return personB;
        else return personA;
    }

    @Override
    public String createChatRoom(HttpServletRequest request, String userNickname) {
        UserEntity loginUser = getUserEntity(request);
        UserEntity toUser = userRepository.findByUserNickname(userNickname).get();

        String roomId;
        Optional<ChatInfoEntity> chatInfoEntity = chatInfoRepository.findByPersonAOrPersonB(loginUser, toUser);
        if(chatInfoEntity.isPresent()){ // 이미 있는 채팅, 채팅 방 번호 전달
            roomId = String.valueOf(chatInfoEntity.get().getIdx());
        }else{ // DB에 방 정보 새로 생성
            ChatInfoEntity chatInfo = new ChatInfoEntity(loginUser, toUser);
            chatInfoRepository.save(chatInfo);
            roomId = String.valueOf(chatInfo.getIdx());
        }
        return roomId;
    }

    @Override
    public void saveMessageRedis(ChatDto chatDto) {
        UserEntity sendUser = userRepository.findByUserNickname(chatDto.getSendUserNickname()).get();
        UserEntity toUser = userRepository.findByUserNickname(chatDto.getToUserNickname()).get();
        String msg = chatDto.getMsg();
        Integer roomId = chatDto.getRoomId();
        Boolean isRead = false;

        ChatEntity chat = ChatEntity.builder()
                .roomId(String.valueOf(roomId)).msg(msg).sendUserId(sendUser.getUserId()).
                toUserId(toUser.getUserId()).isRead(isRead).time(LocalDateTime.now(ZoneId.of("Asia/Seoul"))).build();
        redisTemplate.opsForList().leftPush(String.valueOf(roomId),chat);
    }

    public UserEntity getUserEntity(HttpServletRequest request){
        String userId = kakaoService.decodeToken(request.getHeader("accessToken"));
        Optional<UserEntity> userEntity = userRepository.findByUserId(userId);
        return userEntity.get();
    }
}
