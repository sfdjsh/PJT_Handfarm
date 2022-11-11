package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.device.DeviceRegistDto;
import com.handfarm.backend.service.DeviceService;
import com.handfarm.backend.service.KakaoService;
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
    private static final String FAIL = "error";
    private static final String TIMEOUT = "access-token timeout";
    private static final String MESSAGE = "message";
    private static final HttpStatus status200 = HttpStatus.OK;
    private static final HttpStatus status401 = HttpStatus.UNAUTHORIZED;
    private static final HttpStatus status500 = HttpStatus.INTERNAL_SERVER_ERROR;
    private static HttpStatus status;

    static List<Session> sessionUsers = Collections.synchronizedList(new ArrayList<Session>());
    static Boolean runCheck = false;


    private final DeviceService deviceService;
    private final KakaoService kakaoService;

    @Autowired
    public MyFarmController(DeviceService deviceService, KakaoService kakaoService) {
        this.deviceService = deviceService;
        this.kakaoService = kakaoService;
    }

    @PostMapping("/farm")
    public ResponseEntity<Map<String, Object>> userDeviceRegister(HttpServletRequest request, @RequestBody DeviceRegistDto deviceRegistDto) {
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                deviceService.userRegistDevice(request, deviceRegistDto);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("/farm")
    public ResponseEntity<Map<String, Object>> deviceUpdate(HttpServletRequest request, @RequestBody DeviceRegistDto deviceRegistDto) throws IOException {
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                deviceService.deviceUpdate(request, deviceRegistDto);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }
    @GetMapping("/farm")
    public ResponseEntity<Map<String, Object>> userDeviceGet(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                resultMap.putAll(deviceService.getUserDeviceAll(request.getHeader("accessToken")));
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @PostMapping("/device")
    public void deviceRegister(@RequestBody DeviceRegistDto deviceRegistDto) throws IOException {
        deviceService.registDevice(deviceRegistDto);
    }

    public Boolean checkToken(HttpServletRequest request, Map<String , Object> resultMap){
        try{
            kakaoService.CheckAccessToken(request.getHeader("accessToken"));
            return true;
        }catch (Exception e){
            e.printStackTrace();
            if(request != null && request.getHeader("accessToken") !=null){
                resultMap.put("message", TIMEOUT);
            }else{
                resultMap.put("message", "acessToken is empty");
            }
            status = status401;
            return false;
        }
    }


}
