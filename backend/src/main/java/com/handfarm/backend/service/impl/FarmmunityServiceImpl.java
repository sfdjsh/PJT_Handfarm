package com.handfarm.backend.service.impl;

import com.handfarm.backend.domain.dto.article.ArticleRegistDto;
import com.handfarm.backend.domain.dto.article.ArticleViewDto;
import com.handfarm.backend.domain.entity.ArticleEntity;
import com.handfarm.backend.domain.entity.CropEntity;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.domain.entity.UserLikeArticlesEntity;
import com.handfarm.backend.repository.*;
import com.handfarm.backend.service.FarmmunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FarmmunityServiceImpl implements FarmmunityService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final CropRepository cropRepository;
    private final DeviceRepository deviceRepository;
    private final UserLikeArticlesRepository userLikeArticlesRepository;

    @Autowired
    FarmmunityServiceImpl(ArticleRepository articleRepository, UserRepository userRepository, CropRepository cropRepository, DeviceRepository deviceRepository, UserLikeArticlesRepository userLikeArticlesRepository){
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.cropRepository = cropRepository;
        this.deviceRepository = deviceRepository;
        this.userLikeArticlesRepository = userLikeArticlesRepository;
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
    public List<ArticleViewDto> getArticleList(String decodeId, String domain, String category) {
        List<ArticleViewDto> result = new ArrayList<>();

        if(domain.equals("정보")){ // 딸기 , 방울 토마투
            CropEntity crop = cropRepository.findByCropName(category);
            List<ArticleEntity> articleInfoList = articleRepository.findByArticleCategoryAndCropIdx(domain, crop);
            if(!articleInfoList.isEmpty()){
                for(ArticleEntity a : articleInfoList){
                    ArticleViewDto article = ArticleViewDto.builder()
                            .idx(a.getIdx())
                            .articleTitle(a.getArticleTitle())
                            .articleImg(a.getArticleImg())
                            .likeCount(1)
                            .commentCount(1)
                            .build();

                    result.add(article);
                }
            }else{
                result = new ArrayList<>();
            }
        }else{ // 지역
            List<ArticleEntity> articleRegionList = articleRepository.findByArticleCategoryAndArticleArea(domain, category);
            if(!articleRegionList.isEmpty()){
                for(ArticleEntity a : articleRegionList){
                    ArticleViewDto article = ArticleViewDto.builder()
                            .idx(a.getIdx())
                            .articleTitle(a.getArticleTitle())
                            .articleImg(null)
                            .likeCount(1)
                            .commentCount(1)
                            .build();

                    result.add(article);
                }
            }else{
                result = new ArrayList<>();
            }
        }
        return result;
    }

    @Override
    public Boolean likeArticle(String decodeId, Integer articleIdx) {
        UserEntity user = userRepository.findByUserId(decodeId).get();
        ArticleEntity article = articleRepository.findById(articleIdx).get();

        Optional<UserLikeArticlesEntity> userLikeArticlesEntity = userLikeArticlesRepository.findByUserAndArticle(user, article);
        if(userLikeArticlesEntity.isPresent()){ // 좋아요 눌렀음 -> 취소


        }else{

            UserLikeArticlesEntity userLikeArticles = UserLikeArticlesEntity.builder()
                    .user(user).article(article).build();

            userLikeArticlesRepository.save(userLikeArticles);
        }
        return null;
    }

}
