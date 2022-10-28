package com.handfarm.backend.service;

import com.handfarm.backend.domain.dto.device.DeviceRegistDto;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public interface DeviceService {
    void registDevice(HttpServletRequest request, DeviceRegistDto deviceRegistDto) throws IOException;

    void userRegistDevice(HttpServletRequest request, DeviceRegistDto deviceRegistDto) throws IOException;
}
