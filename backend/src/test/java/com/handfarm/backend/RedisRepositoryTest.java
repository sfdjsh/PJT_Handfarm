package com.handfarm.backend;

import com.handfarm.backend.domain.entity.ChattInfoEntity;
import com.handfarm.backend.repository.ChattInfoRedisRepository;
import com.handfarm.backend.repository.ChattRedisRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class RedisRepositoryTest {

    private ChattInfoRedisRepository chattInfoRedisRepository;
    private ChattRedisRepository chattRedisRepository;

    @Autowired
    RedisRepositoryTest(ChattInfoRedisRepository chattInfoRedisRepository, ChattRedisRepository chattRedisRepository){
        this.chattInfoRedisRepository = chattInfoRedisRepository;
        this.chattRedisRepository = chattRedisRepository;
    }

    @Test
    void 레디스_테스트(){
        ChattInfoEntity chattInfo = new ChattInfoEntity(1,"김혜진","유승우",1);

        // 저장
        chattInfoRedisRepository.save(chattInfo);


    }
}
