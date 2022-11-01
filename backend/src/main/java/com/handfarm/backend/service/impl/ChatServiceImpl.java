package com.handfarm.backend.service.impl;

import com.handfarm.backend.domain.dto.chat.ChatViewDto;
import com.handfarm.backend.domain.entity.ChatEntity;
import com.handfarm.backend.repository.ChatRedisRepository;
import com.handfarm.backend.repository.UserRepository;
import com.handfarm.backend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.websocket.server.ServerEndpoint;
import java.util.ArrayList;
import java.util.List;

@Service
@ServerEndpoint(value="/chat") // WebSocket의 연결점을 알려주는 어노테이션
public class ChatServiceImpl implements ChatService {

    private static ChatRedisRepository chatRedisRepository;
    private static UserRepository userRepository;

    @Autowired
    ChatServiceImpl(ChatRedisRepository chatRedisRepository, UserRepository userRepository){
        this.chatRedisRepository = chatRedisRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<ChatViewDto> getChatList(String decodeId) {
        List<ChatViewDto> chatList = new ArrayList<>();

        String redisKey = decodeId;

        // 레디스에서 key값을 통해서 찾기

        return null;
    }
    // 새로운 대화 상대가 접속할 때마다 생성
}
