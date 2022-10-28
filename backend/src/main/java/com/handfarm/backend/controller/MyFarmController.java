package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.device.DeviceRegistDto;
import com.handfarm.backend.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/api")
public class MyFarmController {

    @Autowired
    DeviceService deviceService;

    @PostMapping("/farm")
    public void userDeviceRegister(HttpServletRequest request, DeviceRegistDto deviceRegistDto) throws IOException {
        deviceService.userRegistDevice(request, deviceRegistDto);
    }
    @PostMapping("/device")
    public void deviceRegister(@RequestBody DeviceRegistDto deviceRegistDto) throws IOException {
        System.out.println(deviceRegistDto);
        deviceService.registDevice(deviceRegistDto);
    }
}
