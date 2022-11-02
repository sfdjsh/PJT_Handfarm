//package com.handfarm.backend;
//
//import com.handfarm.backend.config.MqttConfig;
//import org.junit.jupiter.api.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//public class MqttTest {
//
//    @Autowired
//    MqttConfig.OutboundGateway outboundGateway;
//
//    @Test
//    public void test(){
//        outboundGateway.sendToMqtt("센서값간다.", "/ssafy/D30/sensor");
//
//
//    }
//}
