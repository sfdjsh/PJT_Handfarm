package com.handfarm.backend;

import com.handfarm.backend.domain.entity.ChatEntity;
import com.handfarm.backend.domain.entity.ChatEntity2;
import com.handfarm.backend.repository.ChatInfoRedisRepository;
import com.handfarm.backend.repository.ChatRedisRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootTest
public class RedisRepositoryTest {

    private final ChatInfoRedisRepository chattInfoRedisRepository;
    private final ChatRedisRepository chattRedisRepository;
    private final RedisTemplate<String, Object> redisTemplate;


    @Autowired
    RedisRepositoryTest(ChatInfoRedisRepository chattInfoRedisRepository, ChatRedisRepository chattRedisRepository, RedisTemplate<String, Object> redisTemplate){
        this.chattInfoRedisRepository = chattInfoRedisRepository;
        this.chattRedisRepository = chattRedisRepository;
        this.redisTemplate = redisTemplate;
    }

    @Test
    void 채팅처음보내기_테스트22(){
        String decodeId = "aa981204@daum.net";

        String redisKey = decodeId+"swyou1123@naver.com";

        Integer roomId = 12;
        String toUserId = "swyou1123@naver.com";
        String content = "ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇ";

        List<ChatEntity2.Value> values = new ArrayList<>();
        ChatEntity2.Value value= new ChatEntity2.Value(roomId, toUserId, content, LocalDateTime.now());
        values.add(value);
        ChatEntity2 chat = new ChatEntity2(redisKey, values);

///        redisTemplate.opsForList().leftPush(redisKey, chat);

//        chattRedisRepository.save(values);

    }

    @Test
    void 채팅보내기테스트(){
        // given
        String decodeId = "aa981204@daum.net";

        Integer roomId = 12;
        String toUserId = "swyou1123@naver.com";
        String content = "ㅎㅇㅎㅇ?";
        String redisKey = decodeId+"swyou1123@naver.com";
        ChatEntity chat = new ChatEntity(redisKey,roomId, toUserId, content, LocalDateTime.now());


        String keyName = "chatList:"+redisKey;
        redisTemplate.opsForList().leftPush(keyName,chat);
//        redisTemplate.expireAt(keyName, Date.from(ZonedDateTime.now().plusDays(30).toInstant())); // 유효기간 TTL 30일

    }
}
