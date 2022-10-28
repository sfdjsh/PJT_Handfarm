package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.article.ArticleRegistDto;
import com.handfarm.backend.service.FarmmunityService;
import com.handfarm.backend.service.KakaoService;
import com.handfarm.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class FarmmunityController {
    private static final String success = "success";
    private static final String fail = "error";
    private static final String timeOut = "access-token timeout";
    private static HttpStatus status = HttpStatus.NOT_FOUND; // 404에러
    private FarmmunityService farmmunityService;
    private KakaoService kakaoService;
    private UserService userService;

    @Autowired
    FarmmunityController(FarmmunityService farmmunityService, KakaoService kakaoService, UserService userService){
        this.farmmunityService = farmmunityService;
        this.kakaoService = kakaoService;
        this.userService = userService;
    }

    @PostMapping("/{domain}/{category}")
    public ResponseEntity<?> registArticle(HttpServletRequest request, ArticleRegistDto articleRegistDto){
        Map<String, Object> resultMap = new HashMap<>();
        String decodeId = checkToken(request, resultMap);

        try{
            if(decodeId != null){
                farmmunityService.registArticle(articleRegistDto);
            }else{
                resultMap.put("message", fail);
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        }catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

//    @GetMapping("/test")
//    public ResponseEntity<?> testDecodeId(HttpServletRequest request){
//        Map<String, Object> resultMap = new HashMap<>();
//        String decodeId = checkToken(request, resultMap);
//
//        try{
//            if(decodeId != null){
//                String nickname = userService.findByUserId(decodeId);
//                resultMap.put("userNickname", nickname);
//                resultMap.put("message", success);
//                status = HttpStatus.OK;
//            }
//        }catch (Exception e){
//            resultMap.put("message", fail);
//            status = HttpStatus.INTERNAL_SERVER_ERROR;
//        }
//
//        return new ResponseEntity<>(resultMap, status);
//    }

    public String checkToken(HttpServletRequest request, Map<String, Object> resultMap){
        String accessToken = request.getHeader("accessToken"); // access-token 정보
        String decodeId = kakaoService.decodeToken(accessToken);
        if(!decodeId.equals("timeout")){
            return decodeId;
        }else{
            resultMap.put("message", timeOut);
            status = HttpStatus.UNAUTHORIZED;
            return null;
        }
    }
}
