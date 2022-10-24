package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.article.ArticleRegistDto;
import com.handfarm.backend.service.FarmmunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/community")
public class FarmmunityController {
    private static final String success = "SUCCESS";
    private static final String fail = "FAIL";
    private static HttpStatus status = HttpStatus.NOT_FOUND; // 404에러
    private FarmmunityService farmmunityService;

    @Autowired
    FarmmunityController(FarmmunityService farmmunityService){
        this.farmmunityService = farmmunityService;
    }

    @PostMapping("/{domain}/{category}")
    public ResponseEntity<?> registArticle(HttpServletRequest request, ArticleRegistDto articleRegistDto){
        Map<String, Object> resultMap = new HashMap<>();
        farmmunityService.registArticle(articleRegistDto);

        return new ResponseEntity<>(resultMap, status);
    }

}
