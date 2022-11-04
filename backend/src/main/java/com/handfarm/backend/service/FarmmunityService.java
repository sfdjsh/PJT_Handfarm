package com.handfarm.backend.service;

import com.handfarm.backend.domain.dto.article.ArticleRegistDto;
import com.handfarm.backend.domain.dto.article.ArticleViewDto;

import java.util.List;

public interface FarmmunityService {
    void registArticle(String decodeId, ArticleRegistDto articleRegistDto, String domain, String category);

    List<ArticleViewDto> getArticleList(String decodeId, String domain, String category);

    Boolean likeArticle(String decodeId, Integer articleIdx);
}
