package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.ArticleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<ArticleEntity, Integer> {


    Optional<ArticleEntity> findByIdx(Integer articleIdx);
}
