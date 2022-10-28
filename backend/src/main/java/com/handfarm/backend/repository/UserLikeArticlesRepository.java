package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.UserLikeArticlesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLikeArticlesRepository extends JpaRepository<UserLikeArticlesEntity, Integer> {
}
