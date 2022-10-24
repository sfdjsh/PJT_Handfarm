package com.handfarm.backend.service;

import java.util.Map;

public interface KakaoService {
    String[] getKakaoAccessToken(String code);
    Map<String,Object> createKakaoUser(String access_token);
    String decodeToken(String accessToken);
}
