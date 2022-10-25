package com.handfarm.backend.service;

import com.handfarm.backend.domain.dto.notice.NoticeViewDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface NoticeService {
    Long getCountNotice(String decodeId);

    List<NoticeViewDto> getNoticeList(String decodeId);

    boolean readNotice(String decodeId, Integer idx);

    boolean deleteNotice(String decodeId, Integer idx);
}
