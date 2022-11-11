package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.article.ArticleRegistDto;
import com.handfarm.backend.domain.dto.article.CommentRegistDto;
import com.handfarm.backend.service.FarmmunityService;
import com.handfarm.backend.service.KakaoService;
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
public class FarmmunityController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "error";
    private static final String TIMEOUT = "access-token timeout";
    private static HttpStatus status = HttpStatus.NOT_FOUND; // 404에러
    private final FarmmunityService farmmunityService;
    private final KakaoService kakaoService;

    @Autowired
    FarmmunityController(FarmmunityService farmmunityService, KakaoService kakaoService){
        this.farmmunityService = farmmunityService;
        this.kakaoService = kakaoService;
    }

    @PostMapping("/community/{domain}/{category}") // 게시글 작성
    public ResponseEntity<Map<String, Object>> registArticle(HttpServletRequest request, @RequestBody ArticleRegistDto articleRegistDto, @PathVariable("domain") String domain, @PathVariable("category") String category){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            if (!kakaoService.CheckAccessToken(request.getHeader("accessToken"))) {
                resultMap.put("message", TIMEOUT);
                status = HttpStatus.UNAUTHORIZED;
            }else{
                String decodeId = checkToken(request, resultMap);
                farmmunityService.registArticle(decodeId, articleRegistDto, domain, category);
                resultMap.put("message", SUCCESS);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            e.printStackTrace();
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/community/{domain}/{category}") // 게시글 카테고리 별 조회
    public ResponseEntity<Map<String, Object>> getArticleList(@PathVariable("domain") String domain, @PathVariable("category") String category){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            Map<String, Object> res = farmmunityService.getArticleList(domain, category);
            resultMap.put("articleList", res.get("articleList"));
            resultMap.put("articleInfo", res.get("articleInfo"));
            resultMap.put("message", SUCCESS);
            status = HttpStatus.OK;
        }catch (Exception e){
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/community/{article_idx}") // 게시글 상세조회
    public ResponseEntity<Map<String, Object>> getArticleDetail(HttpServletRequest request, @PathVariable("article_idx") Integer articleIdx){
        Map<String, Object> resultMap = new HashMap<>();
        String decodeId = "isLogin";

        try {
            if(request != null && request.getHeader("accessToken") != null ) {
                if(!kakaoService.CheckAccessToken(request.getHeader("accessToken"))){
                    resultMap.put("message", TIMEOUT);
                    status = HttpStatus.UNAUTHORIZED;
                    return new ResponseEntity<>(resultMap, status);
                }
                decodeId = checkToken(request, resultMap); // 아이디가 들어가겠지?????
            }

                Map<String, Object> articleDto = farmmunityService.getArticleDetail(decodeId, articleIdx);
                resultMap.put("articleDto", articleDto.get("articleDetail"));
                resultMap.put("commentList", articleDto.get("commentList"));
                if(articleDto.get("isLikeClicked") != null) resultMap.put("isLikeClicked", articleDto.get("isLikeClicked"));
                resultMap.put("message", SUCCESS);
                status = HttpStatus.OK;

        }catch (Exception e){
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("community/{article_idx}") // 게시글 수정
    public ResponseEntity<Map<String, Object>> updateArticle(HttpServletRequest request, @PathVariable("article_idx") Integer articleIdx, @RequestBody ArticleRegistDto articleRegistDto){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            if (!kakaoService.CheckAccessToken(request.getHeader("accessToken"))) {
                resultMap.put("message", TIMEOUT);
                status = HttpStatus.UNAUTHORIZED;
            }else{
                String decodeId = checkToken(request, resultMap);
                farmmunityService.updateArticle(decodeId, articleIdx, articleRegistDto);
                resultMap.put("message", SUCCESS);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @DeleteMapping("community/{article_idx}") // 게시글 삭제
    public ResponseEntity<Map<String, Object>> deleteArticle(HttpServletRequest request, @PathVariable("article_idx") Integer articleIdx){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            if (!kakaoService.CheckAccessToken(request.getHeader("accessToken"))) {
                resultMap.put("message", TIMEOUT);
                status = HttpStatus.UNAUTHORIZED;
            }else{
                String decodeId = checkToken(request, resultMap);
                farmmunityService.deleteArticle(decodeId, articleIdx);
                resultMap.put("message", SUCCESS);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @PostMapping("/community/{articleIdx}/comment") // 댓글 등록
    public ResponseEntity<Map<String, Object>> registComment(HttpServletRequest request, @RequestBody CommentRegistDto commentRegistDto, @PathVariable("articleIdx") Integer articleIdx){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            if(!kakaoService.CheckAccessToken(request.getHeader("accessToken"))){
                resultMap.put("message", TIMEOUT);
                status = HttpStatus.UNAUTHORIZED;
            }else{
                String decodeId = checkToken(request, resultMap);
                farmmunityService.registComment(decodeId, articleIdx, commentRegistDto);
                resultMap.put("message", SUCCESS);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            e.printStackTrace();
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("community/{article_idx}/comment/{comment_idx}") // 댓글 수정
    public ResponseEntity<Map<String, Object>> updateComment(HttpServletRequest request, @RequestBody CommentRegistDto commentRegistDto, @PathVariable("article_idx") Integer articleIdx, @PathVariable("comment_idx") Integer commentIdx){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            if(!kakaoService.CheckAccessToken(request.getHeader("accessToken"))){
                resultMap.put("message", TIMEOUT);
                status = HttpStatus.UNAUTHORIZED;
            }else{
                String decodeId = checkToken(request, resultMap);
                farmmunityService.updateComment(decodeId, articleIdx, commentIdx, commentRegistDto);
                resultMap.put("message", SUCCESS);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            e.printStackTrace();
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @DeleteMapping("community/{article_idx}/comment/{comment_idx}") // 댓글 삭제
    public ResponseEntity<Map<String, Object>> deleteComment(HttpServletRequest request, @PathVariable("article_idx") Integer articleIdx, @PathVariable("comment_idx") Integer commentIdx){
        Map<String, Object> resultMap = new HashMap<>();
        try {
            if(!kakaoService.CheckAccessToken(request.getHeader("accessToken"))){
                resultMap.put("message", TIMEOUT);
                status = HttpStatus.UNAUTHORIZED;
            }else{
                String decodeId = checkToken(request, resultMap);
                farmmunityService.deleteComment(decodeId, articleIdx, commentIdx);
                resultMap.put("message", SUCCESS);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            e.printStackTrace();
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("community/{article_idx}/like") // 좋아요,좋아요취소
    public ResponseEntity<Map<String, Object>> likeArticle(HttpServletRequest request, @PathVariable("article_idx") Integer articleIdx){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            if (!kakaoService.CheckAccessToken(request.getHeader("accessToken"))) {
                resultMap.put("message", TIMEOUT);
                status = HttpStatus.UNAUTHORIZED;
            }else{
                String decodeId = checkToken(request, resultMap);
                Boolean isLikeClick = farmmunityService.likeArticle(decodeId, articleIdx);
                resultMap.put("isLikeClick", isLikeClick);
                resultMap.put("message", SUCCESS);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("message", FAIL);
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
            resultMap.put("message", TIMEOUT);
            status = HttpStatus.UNAUTHORIZED;
            return null;
        }
    }
}
