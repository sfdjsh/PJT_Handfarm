package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeviceControlRepository extends JpaRepository<DeviceControlEntity, Integer> {
    Optional<DeviceControlEntity> findByDeviceIdxAndControlIdx(DeviceEntity device, ControlEntity control);
}
