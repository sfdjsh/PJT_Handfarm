package com.handfarm.backend.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.handfarm.backend.domain.dto.chat.ChatDetailDto;
import com.handfarm.backend.domain.dto.chat.ChatListViewDto;
import com.handfarm.backend.domain.entity.ChatEntity;
import com.handfarm.backend.domain.entity.ChatInfoEntity;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.repository.ChatInfoRepository;
import com.handfarm.backend.repository.ChatRedisRepository;
import com.handfarm.backend.repository.UserRepository;
import com.handfarm.backend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.websocket.server.ServerEndpoint;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@ServerEndpoint(value="/chat") // WebSocket의 연결점을 알려주는 어노테이션
public class ChatServiceImpl implements ChatService {

    private final ChatRedisRepository chatRedisRepository;
    private final UserRepository userRepository;
    private final ChatInfoRepository chatInfoRepository;
    private final RedisTemplate<String, ChatEntity> redisTemplate;

    @Autowired
    ChatServiceImpl(ChatInfoRepository chatInfoRepository, ChatRedisRepository chatRedisRepository, UserRepository userRepository, RedisTemplate<String, ChatEntity> redisTemplate){
        this.chatRedisRepository = chatRedisRepository;
        this.userRepository = userRepository;
        this.chatInfoRepository = chatInfoRepository;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public List<ChatListViewDto> getChatList(String decodeId) { // 채팅 목록 조회
        List<ChatListViewDto> chatList = new ArrayList<>();
        UserEntity user = userRepository.findByUserId(decodeId).get();
        List<ChatInfoEntity> chatInfoList = chatInfoRepository.findByUserChatInfo(user);

        if (!chatInfoList.isEmpty()) {
            for (ChatInfoEntity c : chatInfoList) {
                String roomId = String.valueOf(c.getIdx());
                Object chatInfo = redisTemplate.opsForList().index(String.valueOf(c.getIdx()), 0);

                ObjectMapper mapper = new ObjectMapper();
                mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // timestamp 형식 안따르도록 설정
                mapper.registerModules(new JavaTimeModule(), new Jdk8Module());
                ChatEntity chatEntity = mapper.convertValue(chatInfo, ChatEntity.class);
                System.out.println(chatEntity);
                ChatInfoEntity chatRoomInfo = chatInfoRepository.findByIdx(Integer.valueOf(roomId));

                UserEntity personA = chatRoomInfo.getPersonA();
                UserEntity personB = chatRoomInfo.getPersonB();
                if (personA.getUserId().equals(decodeId)) {
                    chatList.add(new ChatListViewDto(chatEntity.getRoomId(), personB.getUserNickname(), personB.getUserProfile(), chatEntity.getContent(), chatEntity.getTime()));
                } else {
                    chatList.add(new ChatListViewDto(chatEntity.getRoomId(), personA.getUserNickname(), personB.getUserProfile(), chatEntity.getContent(), chatEntity.getTime()));
                }
            }

            return chatList;
        } else { // 채팅 내용 없음.
            return new ArrayList<>();
        }
    }

    @Override
    public List<ChatDetailDto> getChatDetail(String decodeId, String roomId) { // 채팅 내용 상세 조회
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

                UserEntity toUser = userRepository.findByUserId(chatEntity.getToUserId()).get();
                ChatDetailDto chatDetailDto = ChatDetailDto.builder()
                        .toUserNickname(toUser.getUserNickname())
                        .content(chatEntity.getContent())
                        .time(chatEntity.getTime())
                        .build();

                chatList.add(chatDetailDto);
            }
        }


        return chatList;
    }

    @Override
    public UserEntity getToUser(String decodeId, String roomId) {
        ChatInfoEntity chatRoomInfo = chatInfoRepository.findByIdx(Integer.valueOf(roomId));

        UserEntity personA = chatRoomInfo.getPersonA();
        UserEntity personB = chatRoomInfo.getPersonB();
        if (personA.getUserId().equals(decodeId)) {
            return personB;
        } else {
            return personA;
        }
    }

    @Override
    public String createChatRoom(String decodeId, Integer userIdx) {
        UserEntity loginUser = userRepository.findByUserId(decodeId).get();
        UserEntity toUser = userRepository.findById(userIdx).get();

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

}
