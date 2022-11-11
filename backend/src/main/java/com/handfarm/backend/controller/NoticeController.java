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
    private static final String SUCCESS = "success";
    private static final String FAIL = "error";
    private static final String TIMEOUT = "access-token timeout";
    private static HttpStatus status = HttpStatus.NOT_FOUND; // 404에러

    private NoticeService noticeService;
    private KakaoService kakaoService;

    @Autowired
    NoticeController(NoticeService noticeService, KakaoService kakaoService){

        this.noticeService = noticeService;
        this.kakaoService = kakaoService;
    }

    @GetMapping("/alarm/count")
    public ResponseEntity<Map<String, Object>> countNotice(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        String decodeId = checkToken(request, resultMap);

        try{
            if(decodeId != null){
                resultMap.put("noticeCount",noticeService.getCountNotice(decodeId));
                resultMap.put("message", SUCCESS);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @GetMapping("/alarm") // 전체 알림 조회
    public ResponseEntity<Map<String, Object>> viewNoticeList(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        String decodeId = checkToken(request, resultMap);

        try{
            if(decodeId != null){
                List<NoticeViewDto> list = noticeService.getNoticeList(decodeId);
                resultMap.put("noticeList", list);
                resultMap.put("message", SUCCESS);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @PostMapping("/alarm/{notice_idx}")
    public ResponseEntity<Map<String, Object>> readNotice(HttpServletRequest request, @PathVariable("notice_idx") Integer idx){
        Map<String, Object> resultMap = new HashMap<>();

        try{
            if (!kakaoService.CheckAccessToken(request.getHeader("accessToken"))) {
                resultMap.put("message", TIMEOUT);
                status = HttpStatus.UNAUTHORIZED;
            }else {
                String decodeId = checkToken(request, resultMap);
                if (noticeService.readNotice(decodeId, idx)) {
                    resultMap.put("message", SUCCESS);
                    status = HttpStatus.OK;
                }
            }
        }catch (Exception e){
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @DeleteMapping("/alarm/{notice_idx}")
    public ResponseEntity<Map<String, Object>> deleteNotice(HttpServletRequest request, @PathVariable("notice_idx") Integer idx){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            if (!kakaoService.CheckAccessToken(request.getHeader("accessToken"))) {
                resultMap.put("message", TIMEOUT);
                status = HttpStatus.UNAUTHORIZED;
            }else {
                String decodeId = checkToken(request, resultMap);
                if (noticeService.deleteNotice(decodeId, idx)) {
                    resultMap.put("message", SUCCESS);
                    status = HttpStatus.OK;
                }
            }
        }catch (Exception e){
            resultMap.put("message", FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap,status);
    }

    public String checkToken(HttpServletRequest request, Map<String, Object> resultMap){
        String accessToken = request.getHeader("accessToken"); // access-token 정보
        String decodeId = kakaoService.decodeToken(accessToken);
        if(!decodeId.equals("timeout")){
            return decodeId;
        }else{
            resultMap.put("message", TIMEOUT);
            status = HttpStatus.UNAUTHORIZED;
            return null;
        }
    }
}
