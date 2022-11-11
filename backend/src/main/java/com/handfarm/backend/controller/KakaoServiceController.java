package com.handfarm.backend.controller;

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
public class KakaoServiceController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "error";
    private static final String TIMEOUT = "access-token timeout";
    private static HttpStatus status = HttpStatus.NOT_FOUND; // 404에러

    private final KakaoService kakaoService;

    @Autowired
    KakaoServiceController(KakaoService kakaoService){
        this.kakaoService = kakaoService;
    }


    @GetMapping("/kakao")
    public ResponseEntity<Map<String, Object>> kakaoCallBack(String code){
        Map<String, Object> resultMap = new HashMap<>();

        try{
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.putAll(kakaoService.getKakaoAccessToken(code));
            userInfo.putAll(kakaoService.createKakaoUser((String) userInfo.get("accessToken")));
            resultMap.put("message", SUCCESS);
            resultMap.put("userInfo", userInfo);
            status = HttpStatus.OK;
        } catch (IOException e) {
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/kakao/logout")
    public ResponseEntity<Map<String, Object>> kakaologout(HttpServletRequest request) throws IOException {
        String accessToken = request.getHeader("accessToken");
        Map<String ,Object> map = new HashMap<>();
        map.put("message", kakaoService.KakaoLogout(accessToken));

        status = HttpStatus.OK;
        return new ResponseEntity<>(map, status);
    }

    @GetMapping("/kakao/token")
    public  ResponseEntity<Map<String, Object>> checkRefreshToken(HttpServletRequest request){
        String refreshToken = request.getHeader("refreshToken");
        Map<String ,Object> map = new HashMap<>();
        map.put("accessToken", kakaoService.CheckRefreshToken(refreshToken));

        status = HttpStatus.OK;
        return new ResponseEntity<>(map, status);
    }

    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> tokencheck(HttpServletRequest request) throws IOException {
        Map<String, Object> resultMap = new HashMap<>();


            Map<String, Object> userInfo = new HashMap<>();
            userInfo.putAll(kakaoService.createKakaoUser(request.getHeader("accessToken")));
            resultMap.put("message", SUCCESS);
            resultMap.put("userInfo", userInfo);
            status = HttpStatus.OK;
            return new ResponseEntity<>(resultMap, status);

    }

    @GetMapping("/test/unlink")
    public String servicenulink(HttpServletRequest request) throws IOException {
        String accessToken = request.getHeader("accessToken");
        if(kakaoService.KakaoUnlink(accessToken)){
            return SUCCESS;
        }else{
            return FAIL;
        }
    }
}
