package com.handfarm.backend.sse;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.handfarm.backend.domain.entity.DeviceSensorEntity;
import com.handfarm.backend.repository.DeviceRepository;
import com.handfarm.backend.repository.DeviceSensorRepository;
import com.handfarm.backend.service.DeviceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@Slf4j
public class SseController {

    private final SseEmitters sseEmitters;
    private final DeviceSensorRepository deviceSensorRepository;
    private final DeviceRepository deviceRepository;
    private final DeviceService deviceService;

    public SseController(SseEmitters sseEmitters, DeviceSensorRepository deviceSensorRepository, DeviceRepository deviceRepository, DeviceService deviceService) {
        this.sseEmitters = sseEmitters;
        this.deviceSensorRepository = deviceSensorRepository;
        this.deviceRepository = deviceRepository;
        this.deviceService = deviceService;
    }

    @GetMapping(value = "/connect/{deviceNo}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connect(@PathVariable String deviceNo) {
        SseEmitter emitter = new SseEmitter(1 * 1000L);
        sseEmitters.add(emitter);
        Map<String, Object> resultMap = new HashMap<>(deviceService.getDeviceSensor(deviceNo));


        try {
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data(resultMap));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(emitter);
    }

    @PostMapping("/count")
    public ResponseEntity<Void> count() {
        sseEmitters.count();
        return ResponseEntity.ok().build();
    }
}