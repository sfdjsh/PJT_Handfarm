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
        System.out.println("decodeId :: " + decodeId);
        UserEntity user = userRepository.findByUserId(decodeId).get();
        System.out.println("user :: " + user);
        List<ChatInfoEntity> chatInfoList = chatInfoRepository.findByUserChatInfo(user);

        if (!chatInfoList.isEmpty()) {
            for (ChatInfoEntity c : chatInfoList) {
                System.out.println("c :: " + c);
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
        List<ChatDetailDto> result = new ArrayList<>();

        List<ChatEntity> chat = redisTemplate.opsForList().range(roomId, 0, redisTemplate.opsForList().size(roomId));
        for(ChatEntity c : chat){
            UserEntity toUser = userRepository.findByUserId(c.getToUserId()).get();
            ChatDetailDto chatDto = ChatDetailDto.builder().toUserNikname(toUser.getUserNickname()).content(c.getContent()).time(c.getTime()).build();
            result.add(chatDto);
        }
        return result;
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

}
