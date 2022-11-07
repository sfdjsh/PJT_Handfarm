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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FarmmunityServiceImpl implements FarmmunityService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final CropRepository cropRepository;
    private final DeviceRepository deviceRepository;
    private final CommentRepository commentRepository;

    @Autowired
    FarmmunityServiceImpl(ArticleRepository articleRepository, UserRepository userRepository, CropRepository cropRepository, DeviceRepository deviceRepository, CommentRepository commentRepository){
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.cropRepository = cropRepository;
        this.deviceRepository = deviceRepository;
        this.commentRepository = commentRepository;
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
    public void registComment(String decodeId, Integer articleIdx, CommentRegistDto commentRegistDto){
        String commentContent = commentRegistDto.getCommentContent();
        Integer upIdx = commentRegistDto.getUpIdx();

        UserEntity user = userRepository.findByUserId(decodeId).get();
        ArticleEntity article = articleRepository.findById(articleIdx).get();
        CommentEntity comment = CommentEntity.builder()
                .upIdx(upIdx)
                .commentContent(commentContent)
                .articleIdx(article)
                .userIdx(user).build();
        commentRepository.save(comment);
    }

    @Override
    public void getArticleList(String decodeId, String domain, String category) {

    }

    @Override
    public Map<String, Object> getArticleDetail(Integer articleIdx){
        Map<String, Object> data = new HashMap<>();
        ArticleEntity article = articleRepository.findByIdx(articleIdx).get();
        List<CommentEntity> comment = commentRepository.findByArticleIdx(article);
//       System.out.println(articleIdx);


        if(comment.isEmpty()){
            data.put("commentList", new ArrayList<>());
        }else{
            List<CommentViewDto> commentView = new ArrayList<>();
            for(CommentEntity c: comment){
                CommentViewDto dto = CommentViewDto.builder()
                        .userNickName(c.getUserIdx().getUserNickname())
                        .commentContent(c.getCommentContent())
                        .idx(c.getIdx())
                        .commentTime(c.getCommentTime())
                        .build();
                commentView.add(dto);
            }
            data.put("commentList", commentView);
        }


        ArticleDetailDto articleDetailDto = ArticleDetailDto.builder()
                .articleTitle(article.getArticleTitle())
                .articleImg(article.getArticleImg())
                .articleContent(article.getArticleContent())
                .articleTime(article.getArticleTime())
                .build();


        data.put("articleDetail", articleDetailDto);

        return data;

    }

}
