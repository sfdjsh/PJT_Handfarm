package com.handfarm.backend.config;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.handfarm.backend.domain.entity.DeviceEntity;
import com.handfarm.backend.domain.entity.DeviceSensorEntity;
import com.handfarm.backend.domain.entity.SensorEntity;
import com.handfarm.backend.repository.DeviceRepository;
import com.handfarm.backend.repository.DeviceSensorRepository;
import com.handfarm.backend.repository.SensorRepository;
import com.handfarm.backend.repository.UserRepository;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.IntegrationComponentScan;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.core.MessageProducer;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.integration.mqtt.outbound.MqttPahoMessageHandler;
import org.springframework.integration.mqtt.support.DefaultPahoMessageConverter;
import org.springframework.integration.mqtt.support.MqttHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;
import org.springframework.messaging.MessagingException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Configuration
@IntegrationComponentScan
public class MqttConfig {
    static String deviceId = "D30";
    private static final String TOPIC_FILTER = "ssafy/"+deviceId+"/info";

    private final DeviceRepository deviceRepository;
    private final UserRepository userRepository;
    private final DeviceSensorRepository deviceSensorRepository;
    private final SensorRepository sensorRepository;

    @Autowired
    public MqttConfig(DeviceRepository deviceRepository, UserRepository userRepository, DeviceSensorRepository deviceSensorRepository, SensorRepository sensorRepository) {
        this.deviceRepository = deviceRepository;
        this.userRepository = userRepository;
        this.deviceSensorRepository = deviceSensorRepository;
        this.sensorRepository = sensorRepository;
    }

    public MqttPahoClientFactory mqttClientFactory() {
        DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();
        MqttConnectOptions options = new MqttConnectOptions();

        options.setServerURIs(new String[] {"tcp://54.180.201.1:1883"});
        options.setUserName("");
        String pass ="";
        options.setPassword(pass.toCharArray());
        options.setCleanSession(true);

        factory.setConnectionOptions(options);

        return factory;
    }

    @Bean
    public MessageChannel mqttInputChannel() {
        return new DirectChannel();
    }
    @Bean
    public MessageProducer inbound(){
        MqttPahoMessageDrivenChannelAdapter adapter = new MqttPahoMessageDrivenChannelAdapter("serverIn",
                mqttClientFactory(),"#");
        adapter.setCompletionTimeout(5000);
        adapter.setConverter(new DefaultPahoMessageConverter());
        adapter.setQos(2);
        adapter.setOutputChannel(mqttInputChannel());
        return adapter;
    }
    @Bean
    @ServiceActivator(inputChannel = "mqttInputChannel")
    public MessageHandler handler(){
        return new MessageHandler() {
            @Override
            public void handleMessage(Message<?> message) throws MessagingException {
                String topic = message.getHeaders().get(MqttHeaders.RECEIVED_TOPIC).toString();
                Map<String, Object> map = new HashMap<>();
                if(TOPIC_FILTER.equals(topic)) {
                    String deviceSensor = (String) message.getPayload();
                    deviceSensor = deviceSensor.substring(1, deviceSensor.length() - 1);   // Json {  } 제거
                    String[] deviceSensorValue = deviceSensor.split(",");          // 센서이름과 값으로 나누기
                    System.out.println(deviceSensor);

                    for (String it : deviceSensorValue) {                                  // 센서마다 데이터 삽입
                        String[] data = it.split(":");
                        String sensor = data[0];
                        Float value = Float.valueOf(data[1]);
                        SensorEntity sensorEntity = sensorRepository.findBySensorArea(data[0]).get();
                        DeviceEntity deviceEntity = deviceRepository.findByDeviceNo(deviceId).get();
                        Optional<DeviceSensorEntity> deviceSensorEntity = deviceSensorRepository.findByDeviceIdxAndSensorIdx(deviceEntity, sensorEntity);
                        deviceSensorEntity.get().setValue(Float.valueOf(data[1]));
                        deviceSensorRepository.save(deviceSensorEntity.get());
                    }
                }
            }
        };
    }
    @Bean
    public MessageChannel mqttOutboundChannel(){
        return new DirectChannel();
    }

    @Bean
    @ServiceActivator(inputChannel = "mqttOutboundChannel")
    public MessageHandler mqttOutbound(){
        MqttPahoMessageHandler messageHandler = new MqttPahoMessageHandler("serverOut", mqttClientFactory());

        messageHandler.setAsync(true);
        return messageHandler;
    }
}