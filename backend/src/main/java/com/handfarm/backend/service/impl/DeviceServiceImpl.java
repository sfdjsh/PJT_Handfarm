package com.handfarm.backend.service.impl;

import com.google.gson.JsonElement;
import com.handfarm.backend.domain.dto.device.DeviceRegistDto;
import com.handfarm.backend.domain.entity.DeviceEntity;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.repository.CropRepository;
import com.handfarm.backend.repository.DeviceRepository;
import com.handfarm.backend.repository.UserRepository;
import com.handfarm.backend.service.DeviceService;
import com.handfarm.backend.service.KakaoService;
import com.handfarm.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Optional;

@Service
public class DeviceServiceImpl implements DeviceService {




    DeviceRepository deviceRepository;

    @Autowired
    DeviceServiceImpl(DeviceRepository deviceRepository){this.deviceRepository= deviceRepository;}

    @Autowired
    UserService userService;

    @Autowired
    KakaoService kakaoService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CropRepository cropRepository;

    @Override
    public void registDevice(DeviceRegistDto deviceRegistDto) throws IOException {
        DeviceEntity deviceEntity = DeviceEntity.builder()
                .deviceCrops(cropRepository.findByCropName(deviceRegistDto.getDeviceCrops()))
                .deviceNo(deviceRegistDto.getDeviceNo())
                .build();
        deviceRepository.save(deviceEntity);
    }

    @Override
    public void userRegistDevice(HttpServletRequest request, DeviceRegistDto deviceRegistDto) throws IOException {
        JsonElement element = kakaoService.CheckAccessToken(request.getHeader("accesstoken"));
        String email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();

        Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceRegistDto.getDeviceNo());
        deviceEntity.get().setDeviceName(deviceRegistDto.getDeviceName());
        deviceEntity.get().setCropsIdx(cropRepository.findByCropName(deviceRegistDto.getDeviceCrops()));
        deviceRepository.save(deviceEntity.get());

        Optional<UserEntity> userEntity = userRepository.findByUserId(email);
        userEntity.get().setUserDevice(deviceEntity.get());

        userRepository.save(userEntity.get());

    }



}
