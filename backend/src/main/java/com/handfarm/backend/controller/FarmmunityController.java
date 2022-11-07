package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.article.ArticleRegistDto;
import com.handfarm.backend.domain.dto.article.CommentRegistDto;
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

    @PostMapping("/community/{domain}/{category}") // 게시글 작성
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
            e.printStackTrace();
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/community/{domain}/{category}") // 게시글 조회
    public ResponseEntity<?> getArticleList(HttpServletRequest request, @RequestBody ArticleRegistDto articleRegistDto, @PathVariable("domain") String domain, @PathVariable("category") String category){
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

    @GetMapping("/community/{article_idx}")
    public ResponseEntity<?> getArticleDetail(@PathVariable("article_idx") Integer articleIdx){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            Map<String, Object> articleDto = farmmunityService.getArticleDetail(articleIdx);
            resultMap.put("articleDto", articleDto.get("articleDetail"));
            resultMap.put("commentList", articleDto.get("commentList"));
            resultMap.put("message", success);
            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("community/{article_idx}") // 게시글 수정
    public ResponseEntity<?> updateArticle(HttpServletRequest request, @PathVariable("article_idx") Integer articleIdx, @RequestBody ArticleRegistDto articleRegistDto){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            if (!kakaoService.CheckAccessToken(request.getHeader("accessToken"))) {
                resultMap.put("message", timeOut);
                status = HttpStatus.UNAUTHORIZED;
            }else{
                String decodeId = checkToken(request, resultMap);
                farmmunityService.updateArticle(decodeId, articleIdx, articleRegistDto);
                resultMap.put("message", success);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @DeleteMapping("community/{article_idx}") // 게시글 삭제
    public ResponseEntity<?> deleteArticle(HttpServletRequest request, @PathVariable("article_idx") Integer articleIdx){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            if (!kakaoService.CheckAccessToken(request.getHeader("accessToken"))) {
                resultMap.put("message", timeOut);
                status = HttpStatus.UNAUTHORIZED;
            }else{
                String decodeId = checkToken(request, resultMap);
                farmmunityService.deleteArticle(decodeId, articleIdx);
                resultMap.put("message", success);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @PostMapping("/community/{articleIdx}/comment")
    public ResponseEntity<?> registComment(HttpServletRequest request, @RequestBody CommentRegistDto commentRegistDto, @PathVariable("articleIdx") Integer articleIdx){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            if(!kakaoService.CheckAccessToken(request.getHeader("accessToken"))){
                resultMap.put("message", timeOut);
                status = HttpStatus.UNAUTHORIZED;
            }else{
                String decodeId = checkToken(request, resultMap);
                farmmunityService.registComment(decodeId, articleIdx, commentRegistDto);
                resultMap.put("message", success);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            e.printStackTrace();
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @DeleteMapping("community/{article_idx}/comment/{comment_idx}") // 댓글 삭제
    public ResponseEntity<?> registComment(HttpServletRequest request, @PathVariable("article_idx") Integer articleIdx, @PathVariable("comment_idx") Integer commentIdx){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            if(!kakaoService.CheckAccessToken(request.getHeader("accessToken"))){
                resultMap.put("message", timeOut);
                status = HttpStatus.UNAUTHORIZED;
            }else{
                String decodeId = checkToken(request, resultMap);
                farmmunityService.deleteComment(decodeId, articleIdx, commentIdx);
                resultMap.put("message", success);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            e.printStackTrace();
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("community/{article_idx}/like") // 좋아요,좋아요취소
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
