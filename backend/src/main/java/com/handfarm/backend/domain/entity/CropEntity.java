package com.handfarm.backend.domain.entity;


import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@DynamicUpdate
@DynamicInsert
@Table(name="crops")
public class CropEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;

    @Column(name="crop_name")
    private String cropName;

    @Column(name="crop_img")
    private String cropImg;

    @Column(name="crop_description")
    private String cropDescription;

}