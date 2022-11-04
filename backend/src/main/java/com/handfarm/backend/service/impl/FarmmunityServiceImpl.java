package com.handfarm.backend.service.impl;

import com.handfarm.backend.domain.dto.article.ArticleRegistDto;
import com.handfarm.backend.domain.entity.ArticleEntity;
import com.handfarm.backend.domain.entity.CropEntity;
import com.handfarm.backend.domain.entity.DeviceEntity;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.repository.ArticleRepository;
import com.handfarm.backend.repository.CropRepository;
import com.handfarm.backend.repository.DeviceRepository;
import com.handfarm.backend.repository.UserRepository;
import com.handfarm.backend.service.FarmmunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Service
public class FarmmunityServiceImpl implements FarmmunityService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final CropRepository cropRepository;
    private final DeviceRepository deviceRepository;

    @Autowired
    FarmmunityServiceImpl(ArticleRepository articleRepository, UserRepository userRepository, CropRepository cropRepository, DeviceRepository deviceRepository){
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.cropRepository = cropRepository;
        this.deviceRepository = deviceRepository;
    }

    @Override
    public void registArticle(String decodeId, ArticleRegistDto articleRegistDto, String domain, String category) {
        String articleTitle = articleRegistDto.getArticleTitle();
        String articleImg = articleRegistDto.getArticleImg();
        String articleContent = articleRegistDto.getArticleContent();

        UserEntity user = userRepository.findByUserId(decodeId).get();
        if(domain.equals("정보")) { // 딸기, 파프리카, 토마토
            CropEntity crop = cropRepository.findByCropName(category);
            ArticleEntity article = ArticleEntity.builder()
                    .articleCategory("정보")
                    .articleTitle(articleTitle)
                    .articleImg(articleImg)
                    .articleContent(articleContent)
                    .userIdx(user)
                    .cropIdx(crop).build();
            articleRepository.save(article);
        }else{ // 지역
            ArticleEntity article = ArticleEntity.builder()
                    .articleCategory("지역")
                    .articleTitle(articleTitle)
                    .articleContent(articleContent)
                    .userIdx(user)
                    .articleArea(category).build();
            articleRepository.save(article);
        }
    }

    @Override
    public void getArticleList(String decodeId, String domain, String category) {

    }
}
