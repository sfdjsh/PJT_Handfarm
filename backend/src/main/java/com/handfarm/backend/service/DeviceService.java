package com.handfarm.backend.service;

import com.handfarm.backend.domain.dto.device.DeviceRegistDto;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public interface DeviceService {
    void registDevice(DeviceRegistDto deviceRegistDto) throws IOException;

    Object userRegistDevice(HttpServletRequest request, DeviceRegistDto deviceRegistDto) throws IOException;
}
