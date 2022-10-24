package com.handfarm.backend.controller;

import com.handfarm.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class FarmController {
    private static final String success = "SUCCESS";
    private static final String fail = "FAIL";
    private static HttpStatus status = HttpStatus.NOT_FOUND; // 404에러

    private UserService userService;

    @Autowired
    FarmController(UserService userService){
        this.userService = userService;
    }


    @GetMapping("/test")
    public ResponseEntity<?> apiTest(){
        Map<String, Object> resultMap = new HashMap<>();

        resultMap.put("message", success);
        status = HttpStatus.OK;

        return new ResponseEntity<>(resultMap, status);
    }

//    @ResponseBody
//    @GetMapping("/kakao")
//    public void kakaoCallback(@RequestParam String code) {
//        System.out.println(code);
//        String access_token = userService.getKakaoAccessToken(code);
//        userService.createKakaoUser(access_token);
//    }

    @GetMapping("/kakao")
    public ResponseEntity<?> kakaoCallBack(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();

        String code = request.getHeader("code");
        try{
            String[] res = userService.getKakaoAccessToken(code);

            String accessToken = res[0];
            String refreshToken = res[1];

            Map<String, Object> user = userService.createKakaoUser(accessToken);

            resultMap.put("message", success);
            resultMap.put("isRegisted", user.get("isRegisted"));
            resultMap.put("userNickname", user.get("userNickname"));
            resultMap.put("accessToken", accessToken);
            resultMap.put("refreshToken", refreshToken);

            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }
}
