package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.DeviceSensorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceSensorRepository extends JpaRepository<DeviceSensorEntity, Integer> {
}
