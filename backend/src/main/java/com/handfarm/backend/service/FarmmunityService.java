package com.handfarm.backend.service;

import com.handfarm.backend.domain.dto.article.ArticleRegistDto;
import com.handfarm.backend.domain.dto.article.CommentRegistDto;

import java.util.Map;

public interface FarmmunityService {
    void registArticle(String decodeId, ArticleRegistDto articleRegistDto, String domain, String category);

    void getArticleList(String decodeId, String domain, String category);

    Map<String, Object> getArticleDetail(Integer articleIdx);

    void registComment(String decodeId, Integer articleIdx, CommentRegistDto commentRegistDto);
}
