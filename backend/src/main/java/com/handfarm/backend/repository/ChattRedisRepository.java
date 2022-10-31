package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.ChattEntity;
import org.springframework.data.repository.CrudRepository;

public interface ChattRedisRepository extends CrudRepository<ChattEntity, Integer> {
}
