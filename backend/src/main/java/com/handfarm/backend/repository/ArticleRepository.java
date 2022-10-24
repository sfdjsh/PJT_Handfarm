package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.ArticleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<ArticleEntity, Integer> {


}
