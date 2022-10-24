package com.handfarm.backend.service;


import java.util.Map;

public interface UserService {
    String[] getKakaoAccessToken(String code);

    Map<String,Object> createKakaoUser(String access_token);
}
