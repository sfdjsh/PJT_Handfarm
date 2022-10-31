package com.handfarm.backend.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@RedisHash(value="ChatList") // 룸번호 - int?
public class ChattEntity {
    @Id
    private Integer idx;
    private String fromUserNickname;
    private String toUserNickname;
    private String content;
    private LocalDateTime time;

    public ChattEntity(Integer idx, String fromUserNickname, String toUserNickname, String content, LocalDateTime time) {
        this.idx = idx;
        this.fromUserNickname = fromUserNickname;
        this.toUserNickname = toUserNickname;
        this.content = content;
        this.time = time;
    }
}
