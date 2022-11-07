package com.handfarm.backend.service.impl;

import com.handfarm.backend.domain.dto.article.ArticleDetailDto;
import com.handfarm.backend.domain.dto.article.ArticleRegistDto;
import com.handfarm.backend.domain.dto.article.ArticleViewDto;
import com.handfarm.backend.domain.entity.*;
import com.handfarm.backend.domain.dto.article.CommentRegistDto;
import com.handfarm.backend.domain.dto.article.CommentViewDto;
import com.handfarm.backend.repository.*;
import com.handfarm.backend.service.FarmmunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class FarmmunityServiceImpl implements FarmmunityService {

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final CropRepository cropRepository;
    private final DeviceRepository deviceRepository;
    private final CommentRepository commentRepository;
    private final UserLikeArticlesRepository userLikeArticlesRepository;
    private final NoticeRepository noticeRepository;

    @Autowired
    FarmmunityServiceImpl(ArticleRepository articleRepository, UserRepository userRepository, CropRepository cropRepository, DeviceRepository deviceRepository, CommentRepository commentRepository, UserLikeArticlesRepository userLikeArticlesRepository, NoticeRepository noticeRepository){
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.cropRepository = cropRepository;
        this.deviceRepository = deviceRepository;
        this.commentRepository = commentRepository;
        this.userLikeArticlesRepository = userLikeArticlesRepository;
        this.noticeRepository = noticeRepository;
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
    public Map<String, Object> getArticleDetail(Integer articleIdx) {
        Map<String, Object> data = new HashMap<>();
        ArticleEntity article = articleRepository.findByIdx(articleIdx).get();
        List<CommentEntity> comment = commentRepository.findByArticleIdx(article);
//       System.out.println(articleIdx);

        if (comment.isEmpty()) {
            data.put("commentList", new ArrayList<>());
            List<CommentViewDto> commentView = new ArrayList<>();
            for (CommentEntity c : comment) {
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
                            .likeCount(userLikeArticlesRepository.countByArticleIdx(a.getIdx()))
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
                            .likeCount(userLikeArticlesRepository.countByArticleIdx(a.getIdx()))
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
        boolean result = true;
        UserEntity user = userRepository.findByUserId(decodeId).get();
        ArticleEntity article = articleRepository.findById(articleIdx).get();

        Optional<UserLikeArticlesEntity> userLikeArticlesEntity = userLikeArticlesRepository.findByUserAndArticle(user, article);
        if(userLikeArticlesEntity.isPresent()){ // 좋아요 눌렀음 -> 취소
            UserLikeArticlesEntity userLikeArticle = userLikeArticlesEntity.get();
            userLikeArticlesRepository.delete(userLikeArticle);

            result = false;

            // 알림 삭제
            Optional<NoticeEntity> noticeEntityOptional = noticeRepository.findByFromUserAndArticleIdxAndNoticeType(user, articleIdx, "like");

            if(noticeEntityOptional.isPresent()){
                NoticeEntity noticeEntity = noticeEntityOptional.get();
                noticeRepository.delete(noticeEntity);
            }
        }else{
            UserLikeArticlesEntity userLikeArticles = UserLikeArticlesEntity.builder()
                    .user(user).article(article).build();

            userLikeArticlesRepository.save(userLikeArticles);

            // 알림 등록 - 자기 자신이 좋아요 누르면 알림 x
            if(!article.getUserIdx().getUserId().equals(user.getUserId())){
                NoticeEntity notice = NoticeEntity.builder()
                        .noticeType("like")
                        .noticeTime(userLikeArticles.getTime())
                        .toUser(article.getUserIdx())
                        .articleIdx(articleIdx)
                        .fromUser(user)
                        .build();
                noticeRepository.save(notice);
            }
        }
        return result;
    }

    @Override
    public void updateArticle(String decodeId, Integer articleIdx, ArticleRegistDto articleRegistDto) {
        UserEntity user = userRepository.findByUserId(decodeId).get();
        ArticleEntity article = articleRepository.findById(articleIdx).get();

        if(user.getUserId().equals(article.getUserIdx().getUserId())){
            if(article.getArticleCategory().equals("지역")){ // 이미지 없음
                ArticleEntity updateArticle = ArticleEntity.builder()
                        .idx(articleIdx).articleCategory(article.getArticleCategory())
                        .articleArea(article.getArticleArea()).articleTitle(articleRegistDto.getArticleTitle())
                        .articleContent(articleRegistDto.getArticleContent()).userIdx(user)
                        .articleTime(article.getArticleTime()).articleUpdate(LocalDateTime.now()).build();

                articleRepository.save(updateArticle);
            }else{
                CropEntity crop = cropRepository.findByCropName(article.getCropIdx().getCropName());
                ArticleEntity updateArticle = ArticleEntity.builder()
                        .idx(articleIdx).articleCategory(article.getArticleCategory())
                        .articleArea(article.getArticleArea()).articleTitle(articleRegistDto.getArticleTitle())
                        .articleContent(articleRegistDto.getArticleContent()).userIdx(user)
                        .articleImg(articleRegistDto.getArticleImg()).cropIdx(crop)
                        .articleTime(article.getArticleTime()).articleUpdate(LocalDateTime.now()).build();

                articleRepository.save(updateArticle);
            }
        }
    }
}
