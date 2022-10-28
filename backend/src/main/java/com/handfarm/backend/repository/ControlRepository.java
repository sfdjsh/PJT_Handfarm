package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.ControlEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ControlRepository extends JpaRepository<ControlEntity, Integer> {
}
