package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.User.UserDto;
import com.handfarm.backend.service.KakaoService;
import com.handfarm.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
public class MyPageController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "error";
    private static final String TIMEOUT = "accessToken timeout";
    private static HttpStatus status404 = HttpStatus.NOT_FOUND; // 404에러
    private static HttpStatus status200 = HttpStatus.OK; // 404에러
    private static HttpStatus status500 = HttpStatus.INTERNAL_SERVER_ERROR; // 404에러
    private static HttpStatus status401 = HttpStatus.UNAUTHORIZED; // 404에러
    private static HttpStatus status;





    private final KakaoService kakaoService;
    private final UserService userService;

    @Autowired
    public MyPageController(KakaoService kakaoService, UserService userService) {

        this.kakaoService = kakaoService;
        this.userService = userService;
    }

    @GetMapping("/mypage")
    public ResponseEntity<Map<String, Object>> getUserInfo(HttpServletRequest request) throws IOException {
        Map<String ,Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                resultMap.putAll(userService.getUserInfo(request));
                resultMap.put("message", SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put("message", FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("/mypage")
    public ResponseEntity<Map<String, Object>> editUserInfo(HttpServletRequest request, @RequestBody UserDto userDto){
        Map<String , Object> resultMap = new HashMap<>();
        if(!checkToken(request, resultMap)){
            return new ResponseEntity<>(resultMap, status404);
        }
        if(userService.editUserInfo(request, userDto)){
            resultMap.put("message", SUCCESS);
            status404 = HttpStatus.OK;
            return new ResponseEntity<>(resultMap, status404);
        }
        resultMap.put("message", FAIL);
        status404 = HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(resultMap, status404);
    }

    @PostMapping("/mypage")
    public ResponseEntity<Map<String, Object>> onoffUserInfo(HttpServletRequest request, @RequestBody UserDto userDto){
        Map<String , Object> resultMap = new HashMap<>();
        if(!checkToken(request, resultMap)){
            return new ResponseEntity<>(resultMap, status);
        }
        if(userService.onoffUserInfo(request, userDto)){
            resultMap.put("message", SUCCESS);
            status404 = HttpStatus.OK;
            return new ResponseEntity<>(resultMap, status);
        }
        resultMap.put("message", FAIL);
        status404 = HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(resultMap, status);
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
