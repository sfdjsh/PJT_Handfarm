package com.handfarm.backend.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    @ManyToOne
    @JoinColumn(name="to_user_idx")
    private UserEntity user;

    @Column(name="from_user_idx")
    private Integer fromUserIdx;

    @Column(name="notice_type")
    private String noticeType;

    @Column(name="notice_time")
    private LocalDateTime noticeTime;

    @Column(name="is_read")
    private Boolean isRead;

    @Column(name="post_idx")
    private Integer postIdx;

    @Column(name="comment_idx")
    private Integer commentIdx;

    @Column(name="comment_up_idx")
    private Integer commentUpIdx;
}
