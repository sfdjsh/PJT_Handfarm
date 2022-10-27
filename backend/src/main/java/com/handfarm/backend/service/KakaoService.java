package com.handfarm.backend.service;

import java.io.IOException;
import java.util.Map;

public interface KakaoService {
    String[] getKakaoAccessToken(String code);
    Map<String,Object> createKakaoUser(String access_token);
    String decodeToken(String accessToken);

    String CheckRefreshToken(String refreshToken);

    String KakaoLogout(String accessToken) throws IOException;
}
