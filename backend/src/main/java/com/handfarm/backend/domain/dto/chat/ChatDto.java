package com.handfarm.backend.domain.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatDto {
    private Integer roomId; // 각 구독 채널 구분할 수 있는 식별자
    private String loginUserNickname; // 로그인 한 사람 닉네임
    private String toUserNickname; // 받는사람닉네임
    private String msg; // 메시지
}
