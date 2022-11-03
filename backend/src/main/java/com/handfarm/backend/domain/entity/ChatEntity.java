package com.handfarm.backend.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@RedisHash(value="chatList")
public class ChatEntity {
    // Redis Key 값 (사용자들 id 저장)
    // 레디스에 저장된 최종 키 값 -> keyspace:id (chatList:participants)
    @Id
    private String roomId;

    private String sendUserId;
    private String toUserId;
    private String msg;
    private LocalDateTime time;

    public ChatEntity(String roomId, String sendUserId, String toUserId, String msg, LocalDateTime time) {
        this.roomId = roomId;
        this.sendUserId = sendUserId;
        this.toUserId = toUserId;
        this.msg = msg;
        this.time = time;
    }
}
