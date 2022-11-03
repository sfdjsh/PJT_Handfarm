package com.handfarm.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

@Configuration
@EnableWebSocketMessageBroker // STOMP 사용 설정
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer  {

//    @Bean
//    public ServerEndpointExporter serverEndpointExporter() {
//        return new ServerEndpointExporter();
//    }

    @Override // 엔드포인트 등록
    public void registerStompEndpoints(StompEndpointRegistry registry){
        registry.addEndpoint("/ws")
                .setAllowedOrigins("*");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry){
        // /sub 가 붙은 destination의 클라이언트에게 메시지를 보낼 수 있도록 Simple Broker 등록
        registry.enableSimpleBroker("/sub");
        // /pub 가 붙은 메시지들은 @MessageMapping이 붙은 method로 바운드
        registry.setApplicationDestinationPrefixes("/pub");
    }
}