package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.ChattInfoEntity;
import org.springframework.data.repository.CrudRepository;

public interface ChattInfoRedisRepository extends CrudRepository<ChattInfoEntity, Integer> {
}
