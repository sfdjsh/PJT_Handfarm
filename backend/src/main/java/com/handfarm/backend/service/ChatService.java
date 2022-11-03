package com.handfarm.backend.service;

import com.handfarm.backend.domain.dto.chat.ChatDetailDto;
import com.handfarm.backend.domain.dto.chat.ChatListViewDto;
import com.handfarm.backend.domain.entity.UserEntity;

import java.util.List;

public interface ChatService {

    List<ChatListViewDto> getChatList(String decodeId);

    List<ChatDetailDto> getChatDetail(String decodeId, String roomId);

    UserEntity getToUser(String decodeId, String roomId);

    String createChatRoom(String decodeId, Integer userIdx);
}
