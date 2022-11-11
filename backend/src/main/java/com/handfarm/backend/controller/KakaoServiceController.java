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
    private static final String MESSAGE = "message";
    private static final String ACCESSTOKEN = "accessToken";
    private static final HttpStatus status200 = HttpStatus.OK;
    private static final HttpStatus status500 = HttpStatus.INTERNAL_SERVER_ERROR;
    private HttpStatus status;

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
            userInfo.putAll(kakaoService.createKakaoUser((String) userInfo.get(ACCESSTOKEN)));
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("userInfo", userInfo);
            status = status200;
        } catch (IOException e) {
            resultMap.put(MESSAGE, FAIL);
            status = status500;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/kakao/logout")
    public ResponseEntity<Map<String, Object>> kakaologout(HttpServletRequest request) throws IOException {
        Map<String ,Object> resultMap = new HashMap<>();
        try{
            String accessToken = request.getHeader(ACCESSTOKEN);
            resultMap.put(MESSAGE, kakaoService.KakaoLogout(accessToken));
            status = status200;
        }catch (Exception e){
            resultMap.put(MESSAGE, FAIL);
            status = status500;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/kakao/token")
    public  ResponseEntity<Map<String, Object>> checkRefreshToken(HttpServletRequest request){
        Map<String ,Object> resultMap = new HashMap<>();
        try{
            String refreshToken = request.getHeader("refreshToken");
            resultMap.put("accessToken", kakaoService.CheckRefreshToken(refreshToken));
            resultMap.put(MESSAGE, SUCCESS);
            status = status200 ;
        }catch (Exception e){
            resultMap.put(MESSAGE, FAIL);
            status = status500;
        }
        return new ResponseEntity<>(resultMap, status);
    }
// --- 일단 놔두기 --- //
    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> tokencheck(HttpServletRequest request) throws IOException {
        Map<String, Object> resultMap = new HashMap<>();


            Map<String, Object> userInfo = new HashMap<>();
            userInfo.putAll(kakaoService.createKakaoUser(request.getHeader(ACCESSTOKEN)));
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("userInfo", userInfo);
            status = HttpStatus.OK;
            return new ResponseEntity<>(resultMap, status);

    }

    @GetMapping("/test/unlink")
    public String servicenulink(HttpServletRequest request) throws IOException {
        String accessToken = request.getHeader(ACCESSTOKEN);
        if(kakaoService.KakaoUnlink(accessToken)){
            return SUCCESS;
        }else{
            return FAIL;
        }
    }
}
