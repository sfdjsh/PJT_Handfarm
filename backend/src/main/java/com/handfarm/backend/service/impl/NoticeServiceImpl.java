package com.handfarm.backend.service.impl;

import com.handfarm.backend.domain.dto.notice.NoticeViewDto;
import com.handfarm.backend.domain.entity.NoticeEntity;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.repository.NoticeRepository;
import com.handfarm.backend.repository.UserRepository;
import com.handfarm.backend.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NoticeServiceImpl implements NoticeService {

    private UserRepository userRepository;
    private NoticeRepository noticeRepository;

    @Autowired
    NoticeServiceImpl(UserRepository userRepository, NoticeRepository noticeRepository){
        this.userRepository = userRepository;
        this.noticeRepository = noticeRepository;
    }
    @Override
    public Long getCountNotice(String decodeId) {
        UserEntity userEntity = userRepository.findByUserId(decodeId).get();

        return noticeRepository.countByToUserAndIsRead(userEntity, false);
    }

    @Override
    public List<NoticeViewDto> getNoticeList(String decodeId) {
        List<NoticeViewDto> noticeList = new ArrayList<>();

        Optional<UserEntity> userEntityOptional = userRepository.findByUserId(decodeId);
        if(userEntityOptional.isPresent()){
            UserEntity userEntity = userEntityOptional.get();
            List<NoticeEntity> list = noticeRepository.findByToUser(userEntity);
            // 알림 존재
            if(!list.isEmpty()){
                for(NoticeEntity n : list){
                    NoticeViewDto noticeViewDto = NoticeViewDto.builder().idx(n.getIdx())
                            .noticeType(n.getNoticeType())
                            .articeIdx(n.getIdx())
                            .noticeTime(n.getNoticeTime())
                            .userNickname(n.getToUser().getUserNickname())
                            .fromUserNickname(n.getFromUser().getUserNickname())
                            .isRead(n.getIsRead()).build();
                    noticeList.add(noticeViewDto);
                }
            }
        }
        return noticeList;
    }

    @Override
    public boolean readNotice(String decodeId, Integer idx) {
        UserEntity userEntity = userRepository.findByUserId(decodeId).get();
        NoticeEntity notice = noticeRepository.findByToUserAndIdx(userEntity, idx).get();

        notice.setIsRead(true);
        noticeRepository.save(notice);

        if(noticeRepository.findByToUserAndIdx(userEntity, idx).get().getIsRead()) return true;
        return false;
    }

    @Override
    public boolean deleteNotice(String decodeId, Integer idx) {
        UserEntity userEntity = userRepository.findByUserId(decodeId).get();
        NoticeEntity notice = noticeRepository.findByToUserAndIdx(userEntity, idx).get();
        if(notice != null){
            noticeRepository.delete(notice);
        }
        if(!noticeRepository.findByToUserAndIdx(userEntity,idx).isPresent()) return true;
        return false;
    }
}
