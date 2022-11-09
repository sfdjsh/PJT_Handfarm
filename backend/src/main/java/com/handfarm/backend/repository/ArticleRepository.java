package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.ArticleEntity;
import com.handfarm.backend.domain.entity.CropEntity;
import com.handfarm.backend.domain.entity.RegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<ArticleEntity, Integer> {



    List<ArticleEntity> findByArticleCategoryAndCropIdx(String domain, CropEntity crop);

    Optional<ArticleEntity> findByIdx(Integer articleIdx);

    List<ArticleEntity> findByArticleCategoryAndRegionIdx(String domain, RegionEntity region);
}
