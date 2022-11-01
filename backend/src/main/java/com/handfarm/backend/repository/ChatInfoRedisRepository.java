package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.ChatInfoEntity;
import org.springframework.data.repository.CrudRepository;

public interface ChatInfoRedisRepository extends CrudRepository<ChatInfoEntity, Integer> {
}
