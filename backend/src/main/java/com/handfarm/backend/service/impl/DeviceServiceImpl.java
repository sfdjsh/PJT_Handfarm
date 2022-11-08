package com.handfarm.backend.service.impl;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.handfarm.backend.domain.dto.device.DedviceAutoControlDto;
import com.handfarm.backend.domain.dto.device.DeviceRegistDto;
import com.handfarm.backend.domain.entity.*;
import com.handfarm.backend.repository.*;
import com.handfarm.backend.service.DeviceService;
import com.handfarm.backend.service.KakaoService;
import com.handfarm.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;

@Service
public class DeviceServiceImpl implements DeviceService {




    private DeviceRepository deviceRepository;
    private UserService userService;
    private KakaoService kakaoService;
    private UserRepository userRepository;
    private CropRepository cropRepository;
    private UserDeviceRepository userDeviceRepository;
    private DeviceSensorRepository deviceSensorRepository;
    private DeviceControlRepository deviceControlRepository;
    private ControlRepository controlRepository;

    @Autowired
    DeviceServiceImpl(DeviceRepository deviceRepository, UserService userService, KakaoService kakaoService, UserRepository userRepository, CropRepository cropRepository, UserDeviceRepository userDeviceRepository, DeviceSensorRepository deviceSensorRepository, DeviceControlRepository deviceControlRepository, ControlRepository controlRepository){
        this.deviceRepository= deviceRepository;
        this.userService = userService;
        this.kakaoService = kakaoService;
        this.userRepository = userRepository;
        this.cropRepository = cropRepository;
        this.userDeviceRepository = userDeviceRepository;
        this.deviceSensorRepository = deviceSensorRepository;
        this.deviceControlRepository = deviceControlRepository;
        this.controlRepository = controlRepository;
    }
    @Override
    public void registDevice(DeviceRegistDto deviceRegistDto) throws IOException {       // 기기 등록
        DeviceEntity deviceEntity = DeviceEntity.builder()
                .deviceCrops(cropRepository.findByCropName(deviceRegistDto.getDeviceCrops()))
                .deviceNo(deviceRegistDto.getDeviceNo())
                .build();
        deviceRepository.save(deviceEntity);
    }

    @Override
    public boolean userRegistDevice(HttpServletRequest request, DeviceRegistDto deviceRegistDto) {
        String email = kakaoService.decodeToken(request.getHeader("accessToken"));
//            String email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
        System.out.println(email);
        System.out.println(deviceRegistDto);
        System.out.println(deviceRegistDto.getDeviceNo());

        Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceRegistDto.getDeviceNo());
        deviceEntity.get().setDeviceName(deviceRegistDto.getDeviceName());
        deviceEntity.get().setCrop(cropRepository.findByCropName(deviceRegistDto.getDeviceCrops()));
        deviceRepository.save(deviceEntity.get());

        Optional<UserEntity> userEntity = userRepository.findByUserId(email);
        userEntity.get().setDevice(deviceEntity.get());
        UserDeviceEntity userDeviceEntity = new UserDeviceEntity();
        userDeviceEntity.setDeviceIdx(deviceEntity.get());
        userDeviceEntity.setUserIdx(userEntity.get());
        userDeviceRepository.save(userDeviceEntity);
        userRepository.save(userEntity.get());
        return true;
    }

    @Override
    public Boolean deviceUpdate(HttpServletRequest request, DeviceRegistDto deviceRegistDto){
        try {
            Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceRegistDto.getDeviceNo());
            deviceEntity.get().setDeviceName(deviceRegistDto.getDeviceName());
            deviceEntity.get().setCrop(cropRepository.findByCropName(deviceRegistDto.getDeviceCrops()));
            deviceRepository.save(deviceEntity.get());
            return true;
        } catch (NoSuchElementException e){
            return false;
        }
    }


    @Override
    public JsonObject deviceAutoControl(String deviceNo, DedviceAutoControlDto dto) {
        String control = dto.getControlName();
        Integer value = (Integer) dto.getControlValue();
        Optional<ControlEntity> controlEntity = controlRepository.findByControlName(control);
        Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceNo);
        Optional<DeviceControlEntity> deviceControlEntity = deviceControlRepository.findByDeviceIdxAndControlIdx(deviceEntity.get(), controlEntity.get());

        deviceControlEntity.get().setAutoControl(value);

        deviceControlRepository.save(deviceControlEntity.get());
        deviceControlRepository.save(deviceControlEntity.get());
        JsonObject object = new JsonObject();
        object.addProperty(control, value);
        Map<String, Object> map = new HashMap<>();
        map.put(control, value);

        return object;
    }

    @Override
    public JsonObject deviceAutoControlValue(String deviceNo, DedviceAutoControlDto dto) {
        String control = dto.getControlName();
        String value = String.valueOf(dto.getControlValue());
        Optional<ControlEntity> controlEntity = controlRepository.findByControlName(control);
        Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceNo);
        Optional<DeviceControlEntity> deviceControlEntity = deviceControlRepository.findByDeviceIdxAndControlIdx(deviceEntity.get(), controlEntity.get());

        deviceControlEntity.get().setAutoControlval(value);

        deviceControlRepository.save(deviceControlEntity.get());
        deviceControlRepository.save(deviceControlEntity.get());
        JsonObject object = new JsonObject();
        object.addProperty(control, value);
        Map<String, Object> map = new HashMap<>();
        map.put(control, value);

        return object;
    }

    @Override
    public JsonObject deviceManual(String deviceNo, DedviceAutoControlDto dto) {
        String control = dto.getControlName();
        Integer value = (Integer) dto.getControlValue();
        Optional<ControlEntity> controlEntity = controlRepository.findByControlName(control);
        Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceNo);
        Optional<DeviceControlEntity> deviceControlEntity = deviceControlRepository.findByDeviceIdxAndControlIdx(deviceEntity.get(), controlEntity.get());

        deviceControlEntity.get().setManualControl(value);

        deviceControlRepository.save(deviceControlEntity.get());
        deviceControlRepository.save(deviceControlEntity.get());
        JsonObject object = new JsonObject();
        object.addProperty(control, value);
        Map<String, Object> map = new HashMap<>();
        map.put(control, value);

        return object;
    }

    public Map<String, Object> getUserDeviceAll(String accessToken) throws IOException {
        Map<String, Object> returnMap = new HashMap<>();

        JsonElement element = kakaoService.GetUserInfo(accessToken);
        String email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").toString();
        Optional<UserEntity> userEntity =  userRepository.findByUserId(email);
        List<UserDeviceEntity> userDeviceEntityList = userDeviceRepository.findByUserIdx(userEntity.get());
        for(UserDeviceEntity userDeviceEntity : userDeviceEntityList){
            DeviceEntity deviceEntity = userDeviceEntity.getDeviceIdx();
            Map<String, Object> inMap = new HashMap<>();
            inMap.put("latitude" , deviceEntity.getDeviceLatitude());
            inMap.put("longitude" , deviceEntity.getDeviceLong());
            List<DeviceSensorEntity> deviceSensorEntityList = deviceSensorRepository.findByDeviceIdx(deviceEntity);
            for(DeviceSensorEntity deviceSensorEntity : deviceSensorEntityList){
            }
        }

        return returnMap;
    }

    @Override
    public Map<String, Object> getDeviceSensor(String deviceNo) {
        Integer deviceIdx = deviceRepository.findByDeviceNo(deviceNo).get().getIdx();
        Map<String, Object> map = new HashMap<>();
        DeviceEntity device = deviceRepository.findById(deviceIdx).get();
        List<DeviceSensorEntity> deviceSensorEntityList = deviceSensorRepository.findByDeviceIdx(device);
        for(DeviceSensorEntity deviceSensorEntity : deviceSensorEntityList){
            String sensorName = deviceSensorEntity.getSensorIdx().getSensorArea();
            Float sensorValue = deviceSensorEntity.getValue();
            map.put(sensorName, sensorValue);
        }
        return map;
    }


}
