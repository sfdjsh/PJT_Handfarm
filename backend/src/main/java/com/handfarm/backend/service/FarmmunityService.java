package com.handfarm.backend.service;

import com.handfarm.backend.domain.dto.article.ArticleRegistDto;

public interface FarmmunityService {
    void registArticle(String decodeId, ArticleRegistDto articleRegistDto, String domain, String category);

    void getArticleList(String decodeId, String domain, String category);
}
