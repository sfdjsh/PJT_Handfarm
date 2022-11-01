package com.handfarm.backend.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@RedisHash(value="chatList") // redis의 keyspace값
public class ChatEntity {
    // Redis Key 값 (사용자들 id 저장)
    // 레디스에 저장된 최종 키 값 -> keyspace:id (chatList:participants)
    @Id
    private String participants;

    private Integer roomId;
    private String toUserId;
    private String content;
    private LocalDateTime time;

    public ChatEntity(String participants, Integer roomId, String toUserId, String content, LocalDateTime time) {
        this.participants = participants;
        this.roomId = roomId;
        this.toUserId = toUserId;
        this.content = content;
        this.time = time;
    }

    public ChatEntity(Integer roomId, String toUserId, String content, LocalDateTime time) {
        this.roomId = roomId;
        this.toUserId = toUserId;
        this.content = content;
        this.time = time;
    }
}
