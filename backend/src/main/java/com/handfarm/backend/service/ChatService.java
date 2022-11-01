package com.handfarm.backend.service;

import com.handfarm.backend.domain.dto.chat.ChatListViewDto;

import java.util.List;

public interface ChatService {

    List<ChatListViewDto> getChatList(String decodeId);
}
