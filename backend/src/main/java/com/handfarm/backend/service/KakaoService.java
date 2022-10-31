package com.handfarm.backend.service;

import com.google.gson.JsonElement;

import java.io.IOException;
import java.io.IOException;
import java.util.Map;

public interface KakaoService {
    String[] getKakaoAccessToken(String code) throws IOException;
    Map<String,Object> createKakaoUser(String access_token);
    String decodeToken(String accessToken);

    JsonElement CheckAccessToken(String accessToken) throws IOException;

    String CheckRefreshToken(String refreshToken);

    String KakaoLogout(String accessToken) throws IOException;
}
