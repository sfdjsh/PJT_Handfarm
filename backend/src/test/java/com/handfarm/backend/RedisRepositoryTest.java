package com.handfarm.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.handfarm.backend.domain.dto.chat.ChatListViewDto;
import com.handfarm.backend.domain.entity.ChatEntity;
import com.handfarm.backend.domain.entity.ChatInfoEntity;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.repository.ChatInfoRepository;
import com.handfarm.backend.repository.ChatRedisRepository;
import com.handfarm.backend.repository.UserRepository;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@Disabled
public class RedisRepositoryTest {

    private final ChatInfoRepository chatInfoRepository;
    private final ChatRedisRepository chatRedisRepository;
    private final RedisTemplate<String, ChatEntity> redisTemplate;
    private final UserRepository userRepository;


    @Autowired
    RedisRepositoryTest(ChatInfoRepository chatInfoRepository, ChatRedisRepository chatRedisRepository, RedisTemplate<String, ChatEntity> redisTemplate, UserRepository userRepository){
        this.chatInfoRepository = chatInfoRepository;
        this.chatRedisRepository = chatRedisRepository;
        this.redisTemplate = redisTemplate;
        this.userRepository = userRepository;
    }

    @Test
    void 채팅보내기(){
        String decodeId = "aa981204@daum.net"; // header에 있어.
        String toUserNickname = "석호"; // 내가 클릭 하면 알 수 있어
//        String roomId = "21"; // 클릭하면 알고 있어

        String content = "앙뇽"; // 보내야될 메시지 -> webSocket으로 통신

        String msg = "";
        //

        UserEntity personA = userRepository.findByUserId(decodeId).get();
        UserEntity personB = userRepository.findByUserNickname(toUserNickname).get();
        Integer roomId;
        Optional<ChatInfoEntity> chatInfoEntity = chatInfoRepository.findByPersonAOrPersonB(personA, personB);
        if(chatInfoEntity.isPresent()){ // 이미 있는 채팅, 채팅방 번호 가져와서 레디스에 연결
            roomId = chatInfoEntity.get().getIdx();
            System.out.println("채팅 방 번호 : " + roomId);
        }else{ // 없으면 새로운 채팅방 생성 후 채팅방 번호 가져오기
            ChatInfoEntity chatInfo = new ChatInfoEntity(personA, personB);
            chatInfoRepository.save(chatInfo);
            roomId = chatInfo.getIdx();
            System.out.println("채팅 방 번호 : " + roomId);
        }

        ChatEntity chat = new ChatEntity(String.valueOf(roomId), personB.getUserId(), content, LocalDateTime.now());
        redisTemplate.opsForList().leftPush(String.valueOf(roomId),chat);
//        redisTemplate.expireAt(String.valueOf(roomId), Date.from(ZonedDateTime.now().plusMinutes(5).toInstant())); // 유효기간 TTL 30일
    }

    @Test
    void 사용자_채팅목록_조회(){
        String decodeId = "aa981204@daum.net";

        List<ChatListViewDto> chatList = new ArrayList<>();

        UserEntity user = userRepository.findByUserId(decodeId).get();
        List<ChatInfoEntity> chatInfoList = chatInfoRepository.findByUserChatInfo(user);

        if(!chatInfoList.isEmpty()){
            for(ChatInfoEntity c : chatInfoList){
                String roomId = String.valueOf(c.getIdx());
                System.out.println("채팅방번호 : " + roomId);
                Object chatInfo = redisTemplate.opsForList().index(String.valueOf(c.getIdx()),0);

                ObjectMapper mapper = new ObjectMapper();
                mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // timestamp 형식 안따르도록 설정
                mapper.registerModules(new JavaTimeModule(), new Jdk8Module());
                ChatEntity chatEntity = mapper.convertValue(chatInfo, ChatEntity.class);

                ChatInfoEntity chatRoomInfo = chatInfoRepository.findByIdx(Integer.valueOf(roomId));

                UserEntity personA = chatRoomInfo.getPersonA();
                UserEntity personB = chatRoomInfo.getPersonB();
                if(personA.getUserId().equals(decodeId)){
                    chatList.add(new ChatListViewDto(chatEntity.getRoomId(), personB.getUserNickname(), personB.getUserProfile(),chatEntity.getContent(), chatEntity.getTime()));
                }else{
                    chatList.add(new ChatListViewDto(chatEntity.getRoomId(), personA.getUserNickname(), personB.getUserProfile(),chatEntity.getContent(), chatEntity.getTime()));
                }
            }

        }

        for(ChatListViewDto c : chatList){
            System.out.println(c.toString());
        }
    }

    @Test
    void 채팅상세조회(){
        String roomId = "21";

        List<ChatEntity> chat = redisTemplate.opsForList().range(roomId , 0, redisTemplate.opsForList().size(roomId));

        for(int i=0; i<chat.size(); i++){
            System.out.println(chat.get(i));
        }
    }
}
