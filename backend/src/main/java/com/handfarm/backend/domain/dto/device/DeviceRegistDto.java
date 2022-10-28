package com.handfarm.backend.domain.dto.device;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceRegistDto {
    private Integer idx;
    private String deviceNo;
    private String deviceImg;
    private Float deviceLoation;
    private Float deviceLatitude;
    private Integer deviceLong;
    private String deviceName;
    private Integer devicecrops;
}
