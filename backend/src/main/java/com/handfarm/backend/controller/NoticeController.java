package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.notice.NoticeViewDto;
import com.handfarm.backend.service.KakaoService;
import com.handfarm.backend.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class NoticeController {
    private static final String success = "success";
    private static final String fail = "error";
    private static final String timeOut = "access-token timeout";
    private static HttpStatus status = HttpStatus.NOT_FOUND; // 404에러

    private NoticeService noticeService;
    private KakaoService kakaoService;

    @Autowired
    NoticeController(NoticeService noticeService, KakaoService kakaoService){

        this.noticeService = noticeService;
        this.kakaoService = kakaoService;
    }

    @GetMapping("/notice/count")
    public ResponseEntity<?> countNotice(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        String decodeId = checkToken(request, resultMap);

        try{
            if(decodeId != null){
                resultMap.put("noticeCount",noticeService.getCountNotice(decodeId));
                resultMap.put("message",success);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @GetMapping("/notice") // 전체 알림 조회
    public ResponseEntity<?> viewNoticeList(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        String decodeId = checkToken(request, resultMap);

        try{
            if(decodeId != null){
                List<NoticeViewDto> list = noticeService.getNoticeList(decodeId);
                resultMap.put("noticeList", list);
                resultMap.put("message", success);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @PostMapping("/notice/{notice_idx}")
    public ResponseEntity<?> readNotice(HttpServletRequest request, @PathVariable("notice_idx") Integer idx){
        Map<String, Object> resultMap = new HashMap<>();
        String decodeId = checkToken(request, resultMap);
        try{
            if(decodeId != null && noticeService.readNotice(decodeId, idx)){
                resultMap.put("message",success);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @DeleteMapping("/notice/{notice_idx}")
    public ResponseEntity<?> deleteNotice(HttpServletRequest request, @PathVariable("notice_idx") Integer idx){
        Map<String, Object> resultMap = new HashMap<>();
        String decodeId = checkToken(request, resultMap);
        try{
            if(decodeId != null && noticeService.deleteNotice(decodeId, idx)){
                resultMap.put("message",success);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap,status);
    }

    public String checkToken(HttpServletRequest request, Map<String, Object> resultMap){
        String accessToken = request.getHeader("Authorization"); // access-token 정보
        String decodeId = kakaoService.decodeToken(accessToken);
        if(!decodeId.equals("timeout")){
            return decodeId;
        }else{
            resultMap.put("message", timeOut);
            status = HttpStatus.UNAUTHORIZED;
            return null;
        }
    }
}
