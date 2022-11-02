package com.handfarm.backend.controller;

import org.springframework.stereotype.Controller;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
@ServerEndpoint("/websocket")
public class WebSocketController {

    static List<Session> sessionUsers = Collections.synchronizedList(new ArrayList<Session>());
    static Boolean runCheck = false;

    static HashMap<String, Session> messageUserList = new HashMap<String, Session>();
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @OnOpen
    public void onOpen(Session session) {
        sendMsg(session);
    }

    @OnClose
    public void onClose(Session userSession) {
        System.out.println("Close Connection!...");
        sessionUsers.remove(userSession);
    }

    @OnError
    public void onError(Throwable e) {
        e.printStackTrace();
    }

    @OnMessage
    public void onMessage(String message) throws IOException {
        System.out.println(message);

        if (runCheck == false) {

            TimerTask task = new TimerTask() {
                @Override
                public void run() {
                    String sensorInfo = message;
                    Iterator<Session> itr = sessionUsers.iterator();
                    while (itr.hasNext()) {
                        try {
                            Session session = itr.next();

                            session.getBasicRemote().sendText(sensorInfo);

                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }

                }
            };

            runCheck = true;

            Timer timer = new Timer(true);
            timer.scheduleAtFixedRate(task, 0, 1 * 1000);
        }
    }
    private void sendMsg(Session session) {
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                try {
                    session.getBasicRemote().sendText(session.toString());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        };

        runCheck = true;

        Timer timer = new Timer(true);
        timer.scheduleAtFixedRate(task, 0, 1 * 1000);
    }
}
