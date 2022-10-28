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
@Table(name="comments")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;

    @Column(name="up_idx")
    private Integer upIdx;

    @Column(name="comment_img")
    private String commentImg;

    @Column(name="comment_time")
    private LocalDateTime commentTime;

    @ManyToOne
    @JoinColumn(name="article_idx")
    private ArticleEntity article;

    @ManyToOne
    @JoinColumn(name="user_idx")
    private UserEntity user;

}
