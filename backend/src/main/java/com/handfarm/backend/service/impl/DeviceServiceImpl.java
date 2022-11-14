package com.handfarm.backend.service.impl;

import com.google.gson.JsonObject;
import com.handfarm.backend.domain.dto.device.DedviceAutoControlDto;
import com.handfarm.backend.domain.dto.device.DeviceRegistDto;
import com.handfarm.backend.domain.dto.device.SensorLogDto;
import com.handfarm.backend.domain.entity.*;
import com.handfarm.backend.repository.*;
import com.handfarm.backend.service.DeviceService;
import com.handfarm.backend.service.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Service
public class DeviceServiceImpl implements DeviceService {




    private final DeviceRepository deviceRepository;
    private final KakaoService kakaoService;
    private final UserRepository userRepository;
    private final CropRepository cropRepository;
    private final UserDeviceRepository userDeviceRepository;
    private final DeviceSensorRepository deviceSensorRepository;
    private final DeviceControlRepository deviceControlRepository;
    private final ControlRepository controlRepository;
    private final DeviceSensorLogRepository deviceSensorLogRepository;

    @Autowired
    DeviceServiceImpl(DeviceRepository deviceRepository, KakaoService kakaoService, UserRepository userRepository, CropRepository cropRepository, UserDeviceRepository userDeviceRepository, DeviceSensorRepository deviceSensorRepository, DeviceControlRepository deviceControlRepository, ControlRepository controlRepository, DeviceSensorLogRepository deviceSensorLogRepository){
        this.deviceRepository= deviceRepository;
        this.kakaoService = kakaoService;
        this.userRepository = userRepository;
        this.cropRepository = cropRepository;
        this.userDeviceRepository = userDeviceRepository;
        this.deviceSensorRepository = deviceSensorRepository;
        this.deviceControlRepository = deviceControlRepository;
        this.controlRepository = controlRepository;
        this.deviceSensorLogRepository = deviceSensorLogRepository;
    }
    @Override
    public void registDevice(DeviceRegistDto deviceRegistDto){       // 기기 등록
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
            if(userEntity.isEmpty() || deviceEntity.isEmpty()) return false;

            if(userDeviceRepository.findByDeviceIdxAndUserIdx(deviceEntity.get(), userEntity.get()) != null){
                throw new NoSuchElementException();
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
            if(deviceEntity.isEmpty()) throw new NoSuchElementException();
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
        if(controlEntity.isEmpty() || deviceEntity.isEmpty()) throw new NoSuchElementException();
        Optional<DeviceControlEntity> deviceControlEntity = deviceControlRepository.findByDeviceIdxAndControlIdx(deviceEntity.get(), controlEntity.get());
        if(deviceControlEntity.isEmpty()) throw new NoSuchElementException();
        deviceControlEntity.get().setAutoControl(value);

        deviceControlRepository.save(deviceControlEntity.get());
        JsonObject object = new JsonObject();
        object.addProperty(control, value);
        return object;
    }

    @Override
    public JsonObject deviceAutoControlValue(String deviceNo, DedviceAutoControlDto dto) {
        String control = dto.getControlName();
        String value = String.valueOf(dto.getControlValue());
        Optional<ControlEntity> controlEntity = controlRepository.findByControlName(control);
        Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceNo);
        if(controlEntity.isEmpty() || deviceEntity.isEmpty()) throw new NoSuchElementException();
        Optional<DeviceControlEntity> deviceControlEntity = deviceControlRepository.findByDeviceIdxAndControlIdx(deviceEntity.get(), controlEntity.get());
        if(deviceControlEntity.isEmpty()) throw new NoSuchElementException();
        deviceControlEntity.get().setAutoControlval(value);

        deviceControlRepository.save(deviceControlEntity.get());
        control = controlEntity.get().getControlArea();
        JsonObject object = new JsonObject();
        object.addProperty(control, value);
        return object;
    }

    @Override
    public JsonObject deviceManual(String deviceNo, DedviceAutoControlDto dto) {
        String control = dto.getControlName();
        Integer value = (Integer) dto.getControlValue();
        Optional<ControlEntity> controlEntity = controlRepository.findByControlName(control);
        Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceNo);
        if(controlEntity.isEmpty() || deviceEntity.isEmpty()) throw new NoSuchElementException();
        Optional<DeviceControlEntity> deviceControlEntity = deviceControlRepository.findByDeviceIdxAndControlIdx(deviceEntity.get(), controlEntity.get());
        if(deviceControlEntity.isEmpty()) throw new NoSuchElementException();
        deviceControlEntity.get().setManualControl(value);

        deviceControlRepository.save(deviceControlEntity.get());
        JsonObject object = new JsonObject();
        object.addProperty(control, value);

        return object;
    }

    @Override
    public Map<String, Object> getUserDeviceAll(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();

        String userId = kakaoService.decodeToken(request.getHeader("accessToken"));
        Optional<UserEntity> userEntity = userRepository.findByUserId(userId);
        if(userEntity.isEmpty()) throw new NoSuchElementException();
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
        if(device.isEmpty()) throw new NoSuchElementException();
        List<Optional<DeviceControlEntity>> deviceControlList = deviceControlRepository.findByDeviceIdx(device.get());

        for(Optional<DeviceControlEntity> deviceControlEntity : deviceControlList){
            if(deviceControlEntity.isEmpty()) throw new NoSuchElementException();
            Map<String, Object> controlMap = new HashMap<>();
            controlMap.put("auto", deviceControlEntity.get().getAutoControl());
            controlMap.put("manual", deviceControlEntity.get().getManualControl());
            resultMap.put(deviceControlEntity.get().getControlIdx().getControlName(), controlMap);
        }

        return resultMap;
    }

    @Override
    public Map<String, Object> getDeviceSensor(String userEmail) {
        Map<String, Object> resultMap = new HashMap<>();
        Optional<UserEntity> userEntity = userRepository.findByUserId(userEmail);
        if(userEntity.isEmpty()) throw new NoSuchElementException();
        for(UserDeviceEntity userDeviceEntity : userDeviceRepository.findByUserIdx(userEntity.get())){
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
    public Map<String, Object> resetAutoValue(String deviceNo, DedviceAutoControlDto controlDto){
        Map<String, Object> resultMap = new HashMap<>();
        Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceNo);
        Optional<ControlEntity> controlEntity = controlRepository.findByControlName(controlDto.getControlName());
        if(deviceEntity.isEmpty() || controlEntity.isEmpty()) throw new NoSuchElementException();
        String control = "";
        if(controlDto.getControlName().equals("temp")){
            control = deviceEntity.get().getCrop().getCropTemp();
        }else if(controlDto.getControlName().equals("fan")){
            control = deviceEntity.get().getCrop().getCropCo2();
        }else if(controlDto.getControlName().equals("pump")){
            control = deviceEntity.get().getCrop().getCropSoilHumidity();
        }else{
            throw new NoSuchElementException();
        }
        if(control == null) throw new NoSuchElementException();
        Optional<ControlEntity> tempControl = controlRepository.findByControlName(controlDto.getControlName());
        Optional<DeviceControlEntity> tempControlEntity = deviceControlRepository.findByDeviceIdxAndControlIdx(deviceEntity.get(), tempControl.get());
        tempControlEntity.get().setAutoControlval(control);
        deviceControlRepository.save(tempControlEntity.get());
        resultMap.put("controlValue", control);

        return resultMap;
    }
    @Override
    public Map<String,Object> getAutoValue(HttpServletRequest request, String userNickname){
        Map<String, Object> resultMap = new HashMap<>();

        String userId = kakaoService.decodeToken(request.getHeader("accessToken"));

        Optional<UserEntity> myUserEntity = userRepository.findByUserId(userId);
        Optional<UserEntity> getUserEntity = userRepository.findByUserNickname(userNickname);
        if(myUserEntity.isEmpty() || getUserEntity.isEmpty()) throw new NoSuchElementException();

        if(!myUserEntity.equals(getUserEntity) && !getUserEntity.get().getUserOpen()) {
            resultMap.put("message", "conceal");
        }else {
            List<Optional<DeviceControlEntity>> deviceControlEntitylist = deviceControlRepository.findByDeviceIdx(getUserEntity.get().getDevice());
            if(deviceControlEntitylist.isEmpty()) throw new NoSuchElementException();
            for (Optional<DeviceControlEntity> deviceControlEntity : deviceControlEntitylist) {
                if(deviceControlEntity.isEmpty()) throw new NoSuchElementException();
                String controlName = deviceControlEntity.get().getControlIdx().getControlName();
                String controlAutoValue = deviceControlEntity.get().getAutoControlval();
                resultMap.put(controlName, controlAutoValue);
            }
        }
        return resultMap;
    }

    @Override
    public Map<String ,Object> getSensorLog(HttpServletRequest request, String deviceNo, String day){
        Map<String ,Object> resultMap = new HashMap<>();
        Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceNo);
        ArrayList<SensorLogDto> sensorLogDtos = new ArrayList<>();
        ArrayList<DeviceSensorLogEntity> deviceSensorLogEntities = new ArrayList<>();
        if(day.equals("hour")){

        }else if(day.equals("day")){
            deviceSensorLogEntities = deviceSensorLogRepository.findByHourValue(deviceEntity);
        }else{
            throw new NoSuchElementException();
        }


        return resultMap;
    }


}
