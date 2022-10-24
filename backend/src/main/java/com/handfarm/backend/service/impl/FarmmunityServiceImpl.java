package com.handfarm.backend.service.impl;

import com.handfarm.backend.domain.dto.article.ArticleRegistDto;
import com.handfarm.backend.repository.ArticleRepository;
import com.handfarm.backend.service.FarmmunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FarmmunityServiceImpl implements FarmmunityService {

    private ArticleRepository articleRepository;

    @Autowired
    FarmmunityServiceImpl(ArticleRepository articleRepository){
        this.articleRepository = articleRepository;
    }

    @Override
    public void registArticle(ArticleRegistDto articleRegistDto) {
        String articleTitle = articleRegistDto.getArticleTitle();
    }
}
