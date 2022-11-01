package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.ChatEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChatRedisRepository extends CrudRepository<ChatEntity, String> {
}
