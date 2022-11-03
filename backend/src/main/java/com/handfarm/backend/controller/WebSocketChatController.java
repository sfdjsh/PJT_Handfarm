package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.chat.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class WebSocketChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;

    // 메시지의 destination이 /hello 였다면 해당 sendMessage() method가 불리도록
    @MessageMapping("/chat")
    public void sendMessage(ChatDto chatDto, SimpMessageHeaderAccessor accessor){
        simpMessagingTemplate.convertAndSend("/sub/chat/" + chatDto.getRoomId(), chatDto);
    }

}
