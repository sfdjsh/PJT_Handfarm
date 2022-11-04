package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.chat.ChatDto;
import com.handfarm.backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class WebSocketDeviceController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatService chatService;

    @Autowired
    WebSocketDeviceController(ChatService chatService, SimpMessagingTemplate simpMessagingTemplate){
        this.chatService = chatService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    // 메시지의 destination이 /hello 였다면 해당 sendMessage() method가 불리도록
    @MessageMapping("/device/{deviceNo}")
    public void sendMessage(ChatDto chatDto, SimpMessageHeaderAccessor accessor, @PathVariable String deviceNo){
        simpMessagingTemplate.convertAndSend("/sub/device" + deviceNo, "이곳에 센서값");
    }

}
