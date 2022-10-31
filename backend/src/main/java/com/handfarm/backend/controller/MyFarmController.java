package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.device.DeviceRegistDto;
import com.handfarm.backend.service.DeviceService;
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
public class MyFarmController {

    private static final String success = "success";
    private static final String fail = "error";
    private static final String timeOut = "access-token timeout";
    private static HttpStatus status = HttpStatus.NOT_FOUND; // 404에러

    @Autowired
    DeviceService deviceService;

    @PostMapping("/farm")
    public ResponseEntity<?> userDeviceRegister(HttpServletRequest request, @RequestBody DeviceRegistDto deviceRegistDto) throws IOException {
        Map<String, Object> returnMap = new HashMap<>();
        if("sucess".equals(deviceService.userRegistDevice(request, deviceRegistDto))) {
            returnMap.put("message", success);
            status = HttpStatus.OK;
        }else{
            returnMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(returnMap, status);
    }
    @GetMapping("/farm")
    public ResponseEntity<?> userDeviceGet(HttpServletRequest request, @RequestBody DeviceRegistDto deviceRegistDto) throws IOException {
        Map<String, Object> returnMap = new HashMap<>();

        return new ResponseEntity<>(returnMap, status);
    }

    @PostMapping("/device")
    public void deviceRegister(@RequestBody DeviceRegistDto deviceRegistDto) throws IOException {
        deviceService.registDevice(deviceRegistDto);

    }
}
