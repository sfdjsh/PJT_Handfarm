package com.handfarm.backend.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;


@Getter
@NoArgsConstructor
@RedisHash(value = "ChattInfo") // Redis의 keyspace값
public class ChatInfoEntity {
    @Id
    private Integer idx;
    private String personA;
    private String personB;
    private Integer roomId;

    public ChatInfoEntity(Integer idx, String personA, String personB, Integer roomId) {
        this.idx = idx;
        this.personA = personA;
        this.personB = personB;
        this.roomId = roomId;
    }
}
