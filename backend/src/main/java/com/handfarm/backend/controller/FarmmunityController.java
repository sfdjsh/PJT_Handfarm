package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.article.ArticleRegistDto;
import com.handfarm.backend.domain.dto.article.ArticleViewDto;
import com.handfarm.backend.service.FarmmunityService;
import com.handfarm.backend.service.KakaoService;
import com.handfarm.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
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

    @PostMapping("/{domain}/{category}") // 게시글 작성
    public ResponseEntity<?> registArticle(HttpServletRequest request, @RequestBody ArticleRegistDto articleRegistDto, @PathVariable("domain") String domain, @PathVariable("category") String category){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            if (!kakaoService.CheckAccessToken(request.getHeader("accessToken"))) {
                resultMap.put("message", timeOut);
                status = HttpStatus.UNAUTHORIZED;
            }else{
                String decodeId = checkToken(request, resultMap);
                farmmunityService.registArticle(decodeId, articleRegistDto, domain, category);
                resultMap.put("message", success);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/{domain}/{category}") // 게시글 조회
    public ResponseEntity<?> getArticleList(HttpServletRequest request, @PathVariable("domain") String domain, @PathVariable("category") String category){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            if (!kakaoService.CheckAccessToken(request.getHeader("accessToken"))) {
                resultMap.put("message", timeOut);
                status = HttpStatus.UNAUTHORIZED;
            }else{
                String decodeId = checkToken(request, resultMap);
                List<ArticleViewDto> articleList = farmmunityService.getArticleList(decodeId, domain, category);
                resultMap.put("articleList", articleList);
                resultMap.put("message", success);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/like/{article_idx}") // 좋아요,좋아요취소
    public ResponseEntity<?> likeArticle(HttpServletRequest request, @PathVariable("article_idx") Integer articleIdx){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            if (!kakaoService.CheckAccessToken(request.getHeader("accessToken"))) {
                resultMap.put("message", timeOut);
                status = HttpStatus.UNAUTHORIZED;
            }else{
                String decodeId = checkToken(request, resultMap);
                Boolean isLikeClick = farmmunityService.likeArticle(decodeId, articleIdx);
                resultMap.put("isLikeClick", isLikeClick);
                resultMap.put("message", success);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }
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
