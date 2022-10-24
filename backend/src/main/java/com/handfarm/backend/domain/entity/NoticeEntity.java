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
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Table(name="notices")
public class NoticeEntity {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Integer idx;

    @Column(name="comment_idx")
    private Integer commentIdx;

    @Column(name="comment_up_idx")
    private Integer commentUpIdx;

    @Column(name="notice_tpye")
    private String noticeType;

}
