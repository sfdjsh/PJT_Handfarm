package com.handfarm.backend.service;

import com.google.gson.JsonObject;
import com.handfarm.backend.domain.dto.device.DedviceAutoControlDto;
import com.handfarm.backend.domain.dto.device.DeviceRegistDto;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

public interface DeviceService {
    void registDevice(DeviceRegistDto deviceRegistDto) throws IOException;

    boolean userRegistDevice(HttpServletRequest request, DeviceRegistDto deviceRegistDto) throws IOException;

    Boolean deviceUpdate(HttpServletRequest request, DeviceRegistDto deviceRegistDto);

    JsonObject deviceAutoControl(String deviceNo, DedviceAutoControlDto dto);

    JsonObject deviceAutoControlValue(String deviceNo, DedviceAutoControlDto dto);

    JsonObject deviceManual(String deviceNo, DedviceAutoControlDto dto);

    Map<String, Object> getUserDeviceAll(String accessToken) throws IOException;

    Map<String, Object> getDeviceSensor(String deviceNo);
}
