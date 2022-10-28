package com.handfarm.backend.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@DynamicUpdate
@DynamicInsert
@NoArgsConstructor
@Table(name="devices_sensors")
public class DeviceSensorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;

    @ManyToOne
    @JoinColumn(name = "device_idx")
    private DeviceEntity device;

    @ManyToOne
    @JoinColumn(name = "sensor_idx")
    private SensorEntity seosor;
}
