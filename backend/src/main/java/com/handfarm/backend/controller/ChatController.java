package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.chat.ChatDetailDto;
import com.handfarm.backend.domain.dto.chat.ChatListViewDto;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.service.ChatService;
import com.handfarm.backend.service.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ChatController {
    private static final String success = "success";
    private static final String fail = "error";
    private static final String timeOut = "access-token timeout";
    private static HttpStatus status = HttpStatus.NOT_FOUND; // 404에러

    private static KakaoService kakaoService;
    private static ChatService chatService;

    @Autowired
    ChatController(KakaoService kakaoService, ChatService chatService){
        this.kakaoService = kakaoService;
        this.chatService = chatService;
    }

    @GetMapping("/chatList") // 전체 메시지 조회
    public ResponseEntity<?> viewChatList(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        String decodeId = checkToken(request, resultMap);

        try{
            if(decodeId != null){
                List<ChatListViewDto> chatList = chatService.getChatList(decodeId);
                resultMap.put("chatList", chatList);
                resultMap.put("message",success);
                status = HttpStatus.OK;
            }
        }catch (Exception e){
            resultMap.put("message", fail);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @GetMapping("/chatList/{roomId}") // 채팅 상세 조회
    public ResponseEntity<?> viewChatDetail(HttpServletRequest request, @PathVariable("roomId") String roomId){
        Map<String, Object> resultMap = new HashMap<>();
        String decodeId = checkToken(request, resultMap);

        try{
            if(decodeId != null){
                List<ChatDetailDto> chatList = chatService.getChatDetail(decodeId, roomId);
                resultMap.put("chatDetail", chatList);
                UserEntity toUser = chatService.getToUser(decodeId, roomId);
                resultMap.put("toUserNickname", toUser.getUserNickname());
                resultMap.put("toUserProfileImg", toUser.getUserProfile());
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
        String accessToken = request.getHeader("accessToken"); // access-token 정보
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
