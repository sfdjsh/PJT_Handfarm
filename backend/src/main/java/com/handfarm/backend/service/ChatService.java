package com.handfarm.backend.service;

import com.handfarm.backend.domain.dto.chat.ChatViewDto;

import java.util.List;

public interface ChatService {

    List<ChatViewDto> getChatList(String decodeId);
}
