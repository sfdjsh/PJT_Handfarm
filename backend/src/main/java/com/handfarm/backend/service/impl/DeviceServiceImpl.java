package com.handfarm.backend.service.impl;

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




    private final DeviceRepository deviceRepository;
    private final UserService userService;
    private final KakaoService kakaoService;
    private final UserRepository userRepository;
    private final CropRepository cropRepository;
    private final UserDeviceRepository userDeviceRepository;
    private final DeviceSensorRepository deviceSensorRepository;
    private final DeviceControlRepository deviceControlRepository;
    private final ControlRepository controlRepository;

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
        try {
            String email = kakaoService.decodeToken(request.getHeader("accessToken"));
            Optional<UserEntity> userEntity = userRepository.findByUserId(email);
            Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceRegistDto.getDeviceNo());

            if(userDeviceRepository.findByDeviceIdxAndUserIdx(deviceEntity.get(), userEntity.get()) != null){
                throw new Exception();
            }

            deviceEntity.get().setDeviceName(deviceRegistDto.getDeviceName());
            deviceEntity.get().setCrop(cropRepository.findByCropName(deviceRegistDto.getDeviceCrops()));
            deviceRepository.save(deviceEntity.get());

            userEntity.get().setDevice(deviceEntity.get());
            UserDeviceEntity userDeviceEntity = new UserDeviceEntity();
            userDeviceEntity.setDeviceIdx(deviceEntity.get());
            userDeviceEntity.setUserIdx(userEntity.get());
            userDeviceRepository.save(userDeviceEntity);
            userRepository.save(userEntity.get());
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
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
        control = controlEntity.get().getControlArea();
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
        JsonObject object = new JsonObject();
        object.addProperty(control, value);
        Map<String, Object> map = new HashMap<>();
        map.put(control, value);

        return object;
    }

    @Override
    public Map<String, Object> getUserDeviceAll(String accessToken) throws IOException {
        Map<String, Object> resultMap = new HashMap<>();

        String userId = kakaoService.decodeToken(accessToken);
        Optional<UserEntity> userEntity = userRepository.findByUserId(userId);
        List<Map<String , Object>> deviceList = new ArrayList<>();
        List<UserDeviceEntity> userDeviceEntityList = userDeviceRepository.findByUserIdx(userEntity.get());
        for(UserDeviceEntity userDeviceEntity : userDeviceEntityList){
            Map<String, Object> deviceMap = new HashMap<>();
            deviceMap.put("deviceNo", userDeviceEntity.getDeviceIdx().getDeviceNo());
            deviceMap.put("deviceName", userDeviceEntity.getDeviceIdx().getDeviceName());
            deviceMap.put("cropName", userDeviceEntity.getDeviceIdx().getCrop().getCropName());
            deviceMap.put("deviceLatitude", userDeviceEntity.getDeviceIdx().getDeviceLatitude());
            deviceMap.put("deviceLong", userDeviceEntity.getDeviceIdx().getDeviceLong());
            deviceMap.put("deviceCamera", userDeviceEntity.getDeviceIdx().getDeviceCamera());
            deviceList.add(deviceMap);
        }
        resultMap.put("deviceInfo", deviceList);

        return resultMap;
    }
    @Override
    public Map<String, Object> getDeviceManual(HttpServletRequest request, String deviceNo){
        Map<String, Object> resultMap = new HashMap<>();

        Optional<DeviceEntity> device = deviceRepository.findByDeviceNo(deviceNo);

        List<Optional<DeviceControlEntity>> deviceControlList = deviceControlRepository.findByDeviceIdx(device.get());

        for(Optional<DeviceControlEntity> deviceControlEntity : deviceControlList){
            Map<String, Object> controlMap = new HashMap<>();
            controlMap.put("auto", deviceControlEntity.get().getAutoControl());
            controlMap.put("manual", deviceControlEntity.get().getManualControl());
            resultMap.put(deviceControlEntity.get().getControlIdx().getControlArea(), controlMap);
        }

        return resultMap;
    }

    @Override
    public Map<String, Object> getDeviceSensor(String userEmail) {
        Map<String, Object> resultMap = new HashMap<>();
        UserEntity userEntity = userRepository.findByUserId(userEmail).get();
        List<UserDeviceEntity> userDeviceEntityList = userDeviceRepository.findByUserIdx(userEntity);
        ArrayList<DeviceEntity> deviceEntityArrayList = new ArrayList<>();
        for(UserDeviceEntity userDeviceEntity : userDeviceRepository.findByUserIdx(userEntity)){
            List<DeviceSensorEntity> deviceSensorEntityList = deviceSensorRepository.findByDeviceIdx(userDeviceEntity.getDeviceIdx());
            Map<String, Object> map = new HashMap<>();
            for(DeviceSensorEntity deviceSensorEntity : deviceSensorEntityList){
                String sensorName = deviceSensorEntity.getSensorIdx().getSensorArea();
                Float sensorValue = deviceSensorEntity.getValue();
                map.put(sensorName, sensorValue);
            }
            resultMap.put(userDeviceEntity.getDeviceIdx().getDeviceNo(), map);
        }
        return resultMap;
    }

    @Override
    public Boolean resetAutoValue(String deviceNo){
        Map<String , Object> resultMap = new HashMap<>();

        Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceNo);

        String temp = deviceEntity.get().getCrop().getCropTemp();
        String co2 = deviceEntity.get().getCrop().getCropCo2();
        String soilHumidity = deviceEntity.get().getCrop().getCropSoilHumidity();

        if(temp == null || co2==null || soilHumidity == null){
            return false;
        }

        Optional<ControlEntity> tempControl = controlRepository.findByControlName("temp");
        Optional<ControlEntity> co2Control = controlRepository.findByControlName("fan");
        Optional<ControlEntity> soilHumidityControl = controlRepository.findByControlName("pump");

        Optional<DeviceControlEntity> tempControlEntity = deviceControlRepository.findByDeviceIdxAndControlIdx(deviceEntity.get(), tempControl.get());
        Optional<DeviceControlEntity> co2ControlEntity = deviceControlRepository.findByDeviceIdxAndControlIdx(deviceEntity.get(), co2Control.get());
        Optional<DeviceControlEntity> soilHumidityControlEntity = deviceControlRepository.findByDeviceIdxAndControlIdx(deviceEntity.get(), soilHumidityControl.get());

        tempControlEntity.get().setAutoControlval(temp);
        co2ControlEntity.get().setAutoControlval(co2);
        soilHumidityControlEntity.get().setAutoControlval(soilHumidity);

        deviceControlRepository.save(tempControlEntity.get());
        deviceControlRepository.save(co2ControlEntity.get());
        deviceControlRepository.save(soilHumidityControlEntity.get());

        return true;
    }

}
