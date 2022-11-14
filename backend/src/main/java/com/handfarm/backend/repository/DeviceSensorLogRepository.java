package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.DeviceEntity;
import com.handfarm.backend.domain.entity.DeviceSensorLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.Optional;

public interface DeviceSensorLogRepository extends JpaRepository<DeviceSensorLogEntity, Integer> {

//    ArrayList<DeviceSensorLogEntity> findByHourValue(Optional<DeviceEntity> deviceEntity);
}
