package com.handfarm.backend.service.impl;

import com.handfarm.backend.domain.dto.chat.ChatViewDto;
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
    public List<ChatViewDto> getChatList(String decodeId) { // 채팅 목록 조회
        List<ChatViewDto> chatList = new ArrayList<>();

        UserEntity user = userRepository.findByUserId(decodeId).get();
        List<ChatInfoEntity> chatInfoList = chatInfoRepository.findByUserChatInfo(user);

        if(!chatInfoList.isEmpty()){
            for(ChatInfoEntity c : chatInfoList){
                String roomId = String.valueOf(c.getIdx());
                ChatEntity chatInfo = redisTemplate.opsForList().index(roomId, 0);
                UserEntity fromUser = userRepository.findByUserId(chatInfo.getToUserId()).get(); // 이거 아냐..
                chatList.add(new ChatViewDto(fromUser.getUserNickname(), fromUser.getUserProfile(), chatInfo.getContent(), chatInfo.getTime()));
            }

            return chatList;
        }else{ // 채팅 내용 없음.
            return new ArrayList<>();
        }


    }
    // 새로운 대화 상대가 접속할 때마다 생성
}
