package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.article.ArticleRegistDto;
import com.handfarm.backend.service.FarmmunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/community")
public class FarmmunityController {

    private FarmmunityService farmmunityService;

    @Autowired
    FarmmunityController(FarmmunityService farmmunityService){
        this.farmmunityService = farmmunityService;
    }

    @PostMapping("/{domain}/{category}")
    public ResponseEntity<?> registArticle(HttpServletRequest request, ArticleRegistDto articleRegistDto){
        farmmunityService.registArticle(articleRegistDto);
    }

}
