package com.handfarm.backend.handler;

import com.handfarm.backend.domain.dto.UserDto;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


// 사진,영상 등 미디어 주고받으려면 BinaryWebSocketHandler
public class WebSocketHandler extends TextWebSocketHandler {
    private final UserRepository userRepository;


    // 연결된 모든 Sessions 저장
    List<WebSocketSession> sessions = new ArrayList<>();
    // userId의 webSession 저장
    Map<String, WebSocketSession> userSession = new HashMap<>();

    @Autowired
    public WebSocketHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 클라이언트 접속 성공, 연결 성공
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception{
        System.out.println("afterConnectionEstablished :: " + session);

        // userID 알아내기
        Map<String, Object> sessionVal = session.getAttributes();
        UserDto userDto = (UserDto) sessionVal.get("userDto");
        System.out.println(userDto.getUserNickname());
        // 유저 정보 가져오기
        UserEntity user = userRepository.findByUserNickname(userDto.getUserNickname()).get();
        String userId = user.getUserId();
        String userNickname = userDto.getUserNickname();

        if(userSession.get(userNickname) != null){
            // userNickname에 원래 웹 세션 값이 저장되어 있다면 update
            userSession.replace(userNickname, session);
        }else{
            // userNickname에 웹 세션 값이 없다면 put
            userSession.put(userNickname, session);
        }
    }

    // 소켓에 메시지를 보냈을 때 js에서 on.message
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
        System.out.println("handleTextMsg :: " + session + " : " + message);

        // protocol : 내용, 보내는 id, 받는 id
        String msg = message.getPayload();
        if(msg != null){
            String[] strs = msg.split(",");
            if(strs != null && strs.length == 3){
                String sendNickname = strs[0];
                String toUserNickname = strs[1];
                String content = strs[2];

                // broadcasting
                if(toUserNickname.equals("")){
                    for(WebSocketSession s : sessions){
                        // message를 TextMessage 형태로 받음
                        s.sendMessage(new TextMessage(toUserNickname + ":" + message.getPayload()));
                    }
                }else{
                    WebSocketSession responseIdSession = userSession.get(toUserNickname);
                    if(responseIdSession != null){
                        TextMessage tmpMsg = new TextMessage(sendNickname +","+toUserNickname+","+content);
                        responseIdSession.sendMessage(tmpMsg);
                    }
                }
            }
        }
    }

    // 소켓이 CLose 됐을 떄
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{
        sessions.remove(session);
        System.out.println("afterHandleTextMessage :: " + session + " : " +status );
    }
}