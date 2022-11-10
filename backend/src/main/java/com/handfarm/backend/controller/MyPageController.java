package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.User.UserDto;
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
public class MyPageController {
    private static final String success = "success";
    private static final String fail = "error";
    private static final String timeOut = "access-token timeout";
    private static HttpStatus status = HttpStatus.NOT_FOUND; // 404에러

    private final KakaoService kakaoService;
    private final UserService userService;

    @Autowired
    public MyPageController(KakaoService kakaoService, UserService userService) {

        this.kakaoService = kakaoService;
        this.userService = userService;
    }

    @GetMapping("/mypage")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) throws IOException {
        Map<String ,Object> resultMap = new HashMap<>();
        if(!checkToken(request.getHeader("accessToken"), resultMap)){
            return new ResponseEntity<>(resultMap, status);
        }
        resultMap.putAll(userService.getUserInfo(request));
        status = HttpStatus.OK;
        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("/mypage")
    public ResponseEntity<?> editUserInfo(HttpServletRequest request, @RequestBody UserDto userDto){
        Map<String , Object> resultMap = new HashMap<>();
        if(!checkToken(request.getHeader("accessToken"), resultMap)){
            return new ResponseEntity<>(resultMap, status);
        }
        if(userService.editUserInfo(request, userDto)){
            resultMap.put("message", success);
            status = HttpStatus.OK;
            return new ResponseEntity<>(resultMap, status);
        }
        resultMap.put("message", fail);
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(resultMap, status);
    }

    @PostMapping("/mypage")
    public ResponseEntity<?> onoffUserInfo(HttpServletRequest request, @RequestBody UserDto userDto){
        Map<String , Object> resultMap = new HashMap<>();
        if(!checkToken(request.getHeader("accessToken"), resultMap)){
            return new ResponseEntity<>(resultMap, status);
        }
        if(userService.onoffUserInfo(request, userDto)){
            resultMap.put("message", success);
            status = HttpStatus.OK;
            return new ResponseEntity<>(resultMap, status);
        }
        resultMap.put("message", fail);
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(resultMap, status);
    }

    public Boolean checkToken(String accessToken, Map<String , Object> resultMap){
        try{
            kakaoService.CheckAccessToken(accessToken);
            return true;
        }catch (IOException e){
            e.printStackTrace();
            resultMap.put("message", timeOut);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            return false;
        }

    }

}
