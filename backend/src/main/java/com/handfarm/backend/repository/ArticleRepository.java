package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.ArticleEntity;
import com.handfarm.backend.domain.entity.CropEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<ArticleEntity, Integer> {



    List<ArticleEntity> findByArticleCategoryAndCropIdx(String domain, CropEntity crop);

    List<ArticleEntity> findByArticleCategoryAndArticleArea(String domain, String category);
    Optional<ArticleEntity> findByIdx(Integer articleIdx);
}
