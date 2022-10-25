package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.NoticeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<NoticeEntity, Integer> {
}
