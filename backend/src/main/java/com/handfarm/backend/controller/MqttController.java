package com.handfarm.backend.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.handfarm.backend.config.MqttGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MqttController {
    @Autowired
    MqttGateway mqttGateway;

    @PostMapping("/sendmessage")
    public ResponseEntity<?> publisher(@RequestBody String Mqttmessage){
        try{
            JsonObject convertObject = new Gson().fromJson(Mqttmessage, JsonObject.class);
            System.out.println(convertObject.get("topic").toString());
            mqttGateway.sendToMqtt(convertObject.get("message").toString(), convertObject.get("topic").toString());
            return  ResponseEntity.ok("sucess");
        }catch (Exception ex){
            ex.printStackTrace();
            return ResponseEntity.ok("fail");
        }

    }
}
