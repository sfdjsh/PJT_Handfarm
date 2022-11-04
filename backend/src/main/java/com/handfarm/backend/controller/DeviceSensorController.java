package com.handfarm.backend.controller;

import com.handfarm.backend.config.MqttGateway;
import com.handfarm.backend.domain.dto.device.DedviceAutoControlDto;
import com.handfarm.backend.repository.UserRepository;
import com.handfarm.backend.service.DeviceService;
import com.handfarm.backend.service.KakaoService;
import com.handfarm.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DeviceSensorController {
    private static final String success = "success";
    private static final String fail = "error";
    private static final String timeOut = "access-token timeout";
    private static HttpStatus status = HttpStatus.NOT_FOUND; // 404에러

    private final MqttGateway mqttGateway;
    private final KakaoService kakaoService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final DeviceService deviceService;
    @Autowired
    public DeviceSensorController(MqttGateway mqttGateway, UserService userService, KakaoService kakaoService, UserRepository userRepository, DeviceService deviceService) {
        this.mqttGateway = mqttGateway;
        this.kakaoService = kakaoService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.deviceService = deviceService;
    }

    @GetMapping("/farm/{deviceNo}")
    public ResponseEntity<?> getDeviceSensor(HttpServletRequest request, @PathVariable String deviceNo) throws IOException {
        Map<String , Object> returnMap = new HashMap<>();
//        if(!kakaoService.CheckAccessToken(request.getHeader("accessToken"))){   // 엑세스 토큰 만료 확인
//            returnMap.put("message", timeOut);
//            status = HttpStatus.INTERNAL_SERVER_ERROR;
//            return new ResponseEntity<>(returnMap, status);
//        }
        returnMap.putAll(deviceService.getDeviceSensor(deviceNo));
        status = HttpStatus.OK;
        return new ResponseEntity<>(returnMap, status);
    }

//    @PutMapping("/farm/{deviceIdx}/auto")
//    public ResponseEntity<?> deviceAutoControlval(HttpServletRequest request, @PathVariable String deviceNo, @RequestBody ){
//
//    }

    @PostMapping("/farm/{deviceNo}")
    public ResponseEntity<?> publisher(HttpServletRequest request, @RequestBody DedviceAutoControlDto dto, @PathVariable("deviceNo") String deviceNo) {
        Map<String, Object> returnMap = new HashMap<>();
        String topic = "ssafy/" + deviceNo + "/autoControl";
//        if(!kakaoService.CheckAccessToken(request.getHeader("accessToken"))){   // 엑세스 토큰 만료 확인
//            returnMap.put("message", timeOut);
//            status = HttpStatus.INTERNAL_SERVER_ERROR;
//            return new ResponseEntity<>(returnMap, status);
//        }
        try{
            String Mqttmessage = String.valueOf(deviceService.deviceAutoControl(deviceNo, dto));
            mqttGateway.sendToMqtt(Mqttmessage, topic);
            returnMap.put("message" , success);
            status = HttpStatus.OK;
            return new ResponseEntity<>(returnMap, status);
        }catch (Exception e){
            e.printStackTrace();
            returnMap.put("message" , fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            return new ResponseEntity<>(returnMap, status);
        }
    }

    @PutMapping("/farm/{deviceNo}/auto")
    public ResponseEntity<?> deviceAutoValue(HttpServletRequest request, @RequestBody DedviceAutoControlDto dto, @PathVariable String deviceNo){
        Map<String, Object> returnMap = new HashMap<>();
        String topic = "ssafy/" + deviceNo + "/autoControlval";

        try{
            String Mqttmessage = String.valueOf(deviceService.deviceAutoControlValue(deviceNo, dto));
            mqttGateway.sendToMqtt(Mqttmessage, topic);
            returnMap.put("message" , success);
            status = HttpStatus.OK;
            return new ResponseEntity<>(returnMap, status);
        }catch (Exception e){
            e.printStackTrace();
            returnMap.put("message" , fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            return new ResponseEntity<>(returnMap, status);
        }
    }

    @PutMapping("/farm/{deviceNo}/manual")
    public ResponseEntity<?> deviceManual(HttpServletRequest request, @RequestBody DedviceAutoControlDto dto, @PathVariable String deviceNo){
        Map<String, Object> returnMap = new HashMap<>();
        String topic = "ssafy/" + deviceNo + "/manualControl";

        try{
            String Mqttmessage = String.valueOf(deviceService.deviceManual(deviceNo, dto));
            mqttGateway.sendToMqtt(Mqttmessage, topic);
            returnMap.put("message" , success);
            status = HttpStatus.OK;
            return new ResponseEntity<>(returnMap, status);
        }catch (Exception e){
            e.printStackTrace();
            returnMap.put("message" , fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            return new ResponseEntity<>(returnMap, status);
        }
    }

}
