package com.handfarm.backend.service.impl;

import com.handfarm.backend.domain.dto.User.UserDto;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.repository.UserRepository;
import com.handfarm.backend.service.KakaoService;
import com.handfarm.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final KakaoService kakaoService;

    @Autowired
    UserServiceImpl(UserRepository userRepository, KakaoService kakaoService){
        this.userRepository = userRepository;
        this.kakaoService = kakaoService;
    }
    @Override
    public String findByUserId(String decodeId) {
        Optional<UserEntity> userEntityOptional = userRepository.findByUserId(decodeId);
        if(userEntityOptional.isPresent()){
            UserEntity userEntity = userEntityOptional.get();
            return userEntity.getUserNickname();
        }
        return null;
    }

    @Override
    public Map<String, Object> getUserInfo(HttpServletRequest request) throws IOException {
        Map<String , Object> resultMap = new HashMap<>();
        UserEntity userEntity = getUserEntity(request);
        resultMap.put("userNickName", userEntity.getUserNickname());
        resultMap.put("userProfile", userEntity.getUserProfile());
        resultMap.put("userOpen", userEntity.getUserOpen());     // 게시글 탑3 가져와야함
        return resultMap;
    }

    @Override
    public Boolean editUserInfo(HttpServletRequest request, UserDto userDto){
        UserEntity userEntity = getUserEntity(request);
        userEntity.setUserNickname(userDto.getUserNickname());
        userEntity.setUserProfile(userDto.getUserProfileImg());
        userRepository.save(userEntity);
        return true;
    }

    @Override
    public Boolean onoffUserInfo(HttpServletRequest request, UserDto userDto){
        UserEntity userEntity = getUserEntity(request);
        userEntity.setUserOpen(userDto.getUserOpen());
        userRepository.save(userEntity);
        return true;
    }

    public UserEntity getUserEntity(HttpServletRequest request){
        String userId = kakaoService.decodeToken(request.getHeader("accessToken"));
        Optional<UserEntity> userEntity = userRepository.findByUserId(userId);
        return userEntity.get();
    }

}
