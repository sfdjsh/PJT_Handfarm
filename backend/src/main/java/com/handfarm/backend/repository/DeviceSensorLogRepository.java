package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.DeviceSensorLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceSensorLogRepository extends JpaRepository<DeviceSensorLogEntity, Integer> {
}
