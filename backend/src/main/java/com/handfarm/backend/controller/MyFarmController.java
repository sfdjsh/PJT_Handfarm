package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.device.DeviceRegistDto;
import com.handfarm.backend.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.Session;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api")
public class MyFarmController {

    private static final String SUCCESS = "success";
    private static final String ERROR = "error";
    private static final String TIMEOUT = "access-token timeout";
    private static HttpStatus status = HttpStatus.NOT_FOUND; // 404에러

    static List<Session> sessionUsers = Collections.synchronizedList(new ArrayList<Session>());
    static Boolean runCheck = false;

    @Autowired
    DeviceService deviceService;

    @PostMapping("/farm")
    public ResponseEntity<Map<String, Object>> userDeviceRegister(HttpServletRequest request, @RequestBody DeviceRegistDto deviceRegistDto) throws IOException {
        Map<String, Object> returnMap = new HashMap<>();
        if(deviceService.userRegistDevice(request, deviceRegistDto)) {
            returnMap.put("message", SUCCESS);
            status = HttpStatus.OK;
        }else{
            returnMap.put("message", ERROR);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(returnMap, status);
    }

    @PutMapping("/farm")
    public ResponseEntity<Map<String, Object>> deviceUpdate(HttpServletRequest request, @RequestBody DeviceRegistDto deviceRegistDto) throws IOException {
        Map<String, Object> returnMap = new HashMap<>();
        if(deviceService.deviceUpdate(request, deviceRegistDto)) {
            returnMap.put("message", SUCCESS);
            status = HttpStatus.OK;
        }else{
            returnMap.put("message", ERROR);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(returnMap, status);
    }
    @GetMapping("/farm")
    public ResponseEntity<Map<String, Object>> userDeviceGet(HttpServletRequest request) throws IOException {

        Map<String, Object> resultMap = new HashMap<>(deviceService.getUserDeviceAll(request.getHeader("accessToken")));


        status = HttpStatus.OK;
        return new ResponseEntity<>(resultMap, status);
    }

    @PostMapping("/device")
    public void deviceRegister(@RequestBody DeviceRegistDto deviceRegistDto) throws IOException {
        deviceService.registDevice(deviceRegistDto);
    }

}
