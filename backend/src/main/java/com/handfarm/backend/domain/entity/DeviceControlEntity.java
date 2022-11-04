package com.handfarm.backend.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="devices_controls")
public class DeviceControlEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;

    @ManyToOne
    @JoinColumn(name = "device_idx")
    private DeviceEntity deviceIdx;

    @ManyToOne
    @JoinColumn(name= "control_idx")
    private ControlEntity controlIdx;

    @Column(name = "device_control_auto")
    private Integer autoControl;

    @Column(name = "device_control_autoval")
    private String autoControlval;

    @Column(name = "device_control_manual")
    private Integer manualControl;
}
