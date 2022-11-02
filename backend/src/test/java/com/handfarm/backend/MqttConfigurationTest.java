package com.handfarm.backend;

import com.handfarm.backend.config.MqttConfig;
import com.handfarm.backend.config.MqttGateway;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@Slf4j
@RunWith(SpringRunner.class)
@ActiveProfiles
@SpringBootTest
public class MqttConfigurationTest {

    @Autowired
    MqttGateway mqttGateway;
    @Test
    public void test() {
        try {
            log.debug("토픽 발행을 시작합니다.");
            mqttGateway.sendToMqtt("즐거운 추석이에요.", "message/topic");
            log.debug("토픽 발행이 종료되었습니다.");
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}