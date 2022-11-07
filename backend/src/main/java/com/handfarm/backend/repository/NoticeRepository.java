package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.NoticeEntity;
import com.handfarm.backend.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoticeRepository extends JpaRepository<NoticeEntity, Integer> {

    List<NoticeEntity> findByToUser(UserEntity userEntity);

    Long countByToUserAndIsRead(UserEntity userEntity, boolean b);

    Optional<NoticeEntity> findByToUserAndIdx(UserEntity userEntity, Integer noticeIdx);

    Optional<NoticeEntity> findByFromUserAndArticleIdxAndNoticeType(UserEntity user, Integer articleIdx, String like);
}
