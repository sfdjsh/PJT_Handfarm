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
@Table(name="articles")
public class ArticleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;

    @Column(name="article_category")
    private String articleCategory;

    @Column(name="article_area")
    private String articleArea;

    @Column(name="article_title")
    private String articleTitle;

    @Column(name="article_img")
    private String articleImg;

    @Column(name="article_content")
    private String articleContent;

    @Column(name="article_time")
    private LocalDateTime articleTime;

    @Column(name="article_update")
    private LocalDateTime articleUpdate;

    @ManyToOne
    @JoinColumn(name="user_idx")
    private UserEntity userIdx;

    @ManyToOne
    @JoinColumn(name="crop_idx")
    private CropEntity cropIdx;
}
