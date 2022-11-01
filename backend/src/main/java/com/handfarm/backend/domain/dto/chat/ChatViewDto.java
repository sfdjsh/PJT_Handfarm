package com.handfarm.backend.domain.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatViewDto {
    private String fromUserNickname;
    private String toUserNickname;
    private String content;
    private LocalDateTime time;
}
