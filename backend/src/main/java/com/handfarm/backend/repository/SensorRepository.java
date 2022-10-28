package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.SensorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SensorRepository extends JpaRepository<SensorEntity, Integer> {
}
