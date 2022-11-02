//package com.handfarm.backend.service.impl;
//
//import org.springframework.stereotype.Service;
//
//import javax.websocket.OnClose;
//import javax.websocket.OnMessage;
//import javax.websocket.OnOpen;
//import javax.websocket.Session;
//import javax.websocket.server.ServerEndpoint;
//import java.util.Collections;
//import java.util.HashSet;
//import java.util.Set;
//
//@Service
//@ServerEndpoint(value="/chat") // Websocket  활성화 시키는 매핑 정보 지정
//public class WebSocketChat {
//    // 클라이언트가 접속할 때마다 클라이언트와 직접 통신하는 클래스
//    // 새로운 클라이언트가 접속할 때마다 클라이언트의 세션 관련 정보 정적형으로 저장하여 1:N의 통신 가능하도록
//    private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());
//
//    @OnOpen
//    public void onOpen(Session s){
//        // 클라이언트가 접속할 떄 발생하는 이벤트
//        // 클라이언트가 "/chat" url로 서버에 접속하게 되면 실행
//        // 클라이언트 정보를 매개변수인 Session 객체를 통해 전달받음
//        System.out.println("open session :: " + s.toString());
//
//        if(!clients.contains(s)){ // 클라이언트가 없으면 clients에 추가
//            clients.add(s);
//            System.out.println("session open :: " + s);
//        }else{
//            System.out.println("이미 연결된 session!!");
//        }
//    }
//
//    @OnMessage
//    public void onMessage(String msg, Session session) throws Exception{
//        // 메시지가 수신되었을 때
//        // 클라이언트로부터 메시지가 전달되면 WebSocketCHat 클래스의 onMessage 메서드에 의해 clients에 있는 모든 session에 메시지 전달
//        // Redis에도 저장해야 하는데??
//        System.out.println("receive message :: " + msg);
//        for(Session s : clients){
//            System.out.println("send data :: " + msg);
//            s.getBasicRemote().sendText(msg);
//        }
//    }
//
//    @OnClose
//    public void onClose(Session s){
//        // 클라이언트가 브라우저를 끄거나 다른 경로로 이동할 때
//        // 해당 클라이언트의 정보를 clients에서 제거
//        System.out.println("session close :: " + s);
//        clients.remove(s);
//    }
//}
