package com.handfarm.backend.service;


import com.handfarm.backend.domain.dto.User.UserDto;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

public interface UserService {

    String findByUserId(String decodeId);

    Map<String, Object> getUserInfo(HttpServletRequest request) throws IOException;

    Boolean editUserInfo(HttpServletRequest request, UserDto userDto);

    Boolean onoffUserInfo(HttpServletRequest request, UserDto userDto);
}
