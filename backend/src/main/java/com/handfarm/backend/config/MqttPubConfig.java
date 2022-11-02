//package com.handfarm.backend.config;
//
//import org.eclipse.paho.client.mqttv3.MqttAsyncClient;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.integration.annotation.MessagingGateway;
//import org.springframework.integration.annotation.ServiceActivator;
//import org.springframework.integration.channel.DirectChannel;
//import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
//import org.springframework.integration.mqtt.outbound.MqttPahoMessageHandler;
//import org.springframework.integration.mqtt.support.MqttHeaders;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.MessageHandler;
//import org.springframework.messaging.handler.annotation.Header;
//
//import java.io.IOException;
//import java.util.Timer;
//import java.util.TimerTask;
//
//@Configuration
//public class MqttPubConfig {
//
//    private static final String MQTT_CLIENT_ID = MqttAsyncClient.generateClientId();
//
//    @Bean
//    public MessageChannel mqttOutboundChannel() {
//        return new DirectChannel();
//    }
//
//    @Bean
//    @ServiceActivator(inputChannel = "mqttOutboundChannel")
//    public MessageHandler mqttOutbound(DefaultMqttPahoClientFactory clientFactory) {
//        MqttPahoMessageHandler messageHandler =
//                new MqttPahoMessageHandler(MQTT_CLIENT_ID, clientFactory);
//        messageHandler.setAsync(true);
//        messageHandler.setDefaultQos(1);
//        return messageHandler;
//
//    }
//
//    @MessagingGateway(defaultRequestChannel = "mqttOutboundChannel")
//    public interface OutboundGateway {
//        void sendToMqtt(String payload, @Header(MqttHeaders.TOPIC) String topic);
//    }
//
//}