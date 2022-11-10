package com.handfarm.backend.service.impl;

import com.handfarm.backend.domain.dto.User.UserDto;
import com.handfarm.backend.domain.dto.article.ArticleViewDto;
import com.handfarm.backend.domain.entity.ArticleEntity;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.repository.ArticleRepository;
import com.handfarm.backend.repository.CommentRepository;
import com.handfarm.backend.repository.UserLikeArticlesRepository;
import com.handfarm.backend.repository.UserRepository;
import com.handfarm.backend.service.KakaoService;
import com.handfarm.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final KakaoService kakaoService;
    private final ArticleRepository articleRepository;
    private final UserLikeArticlesRepository userLikeArticlesRepository;
    private final CommentRepository commentRepository;

    @Autowired
    UserServiceImpl(UserRepository userRepository, KakaoService kakaoService, ArticleRepository articleRepository, UserLikeArticlesRepository userLikeArticlesRepository, CommentRepository commentRepository){
        this.userRepository = userRepository;
        this.kakaoService = kakaoService;
        this.articleRepository = articleRepository;
        this.userLikeArticlesRepository = userLikeArticlesRepository;
        this.commentRepository = commentRepository;
    }
    @Override
    public String findByUserId(String decodeId) {
        Optional<UserEntity> userEntityOptional = userRepository.findByUserId(decodeId);
        if(userEntityOptional.isPresent()){
            UserEntity userEntity = userEntityOptional.get();
            return userEntity.getUserNickname();
        }
        return null;
    }

    @Override
    public Map<String, Object> getUserInfo(HttpServletRequest request) throws IOException {
        Map<String , Object> resultMap = new HashMap<>();
        List<ArticleViewDto> articleList = new ArrayList<>();

        UserEntity userEntity = getUserEntity(request);
        resultMap.put("userNickName", userEntity.getUserNickname());
        resultMap.put("userProfile", userEntity.getUserProfile());
        resultMap.put("userOpen", userEntity.getUserOpen());
        // 게시글 가져오기
        List<ArticleEntity> articleEntityList = articleRepository.findByUserIdx(userEntity);

        if(!articleEntityList.isEmpty()){
            for(ArticleEntity a : articleEntityList){
                ArticleViewDto articleDto = ArticleViewDto.builder().idx(a.getIdx()).articleImg(a.getArticleImg()).articleContent(a.getArticleContent()).articleTitle(a.getArticleTitle())
                        .articleTime(a.getArticleTime()).likeCount(userLikeArticlesRepository.countByArticleIdx(a.getIdx())).commentCount(commentRepository.countByArticleIdx(a)).build();
                articleList.add(articleDto);
            }
            resultMap.put("articleList", articleList);
        }else{
            resultMap.put("articleList", new ArrayList<>());
        }

        return resultMap;
    }

    @Override
    public Boolean editUserInfo(HttpServletRequest request, UserDto userDto){
        UserEntity userEntity = getUserEntity(request);
        userEntity.setUserNickname(userDto.getUserNickname());
        userEntity.setUserProfile(userDto.getUserProfileImg());
        userRepository.save(userEntity);
        return true;
    }

    @Override
    public Boolean onoffUserInfo(HttpServletRequest request, UserDto userDto){
        UserEntity userEntity = getUserEntity(request);
        userEntity.setUserOpen(userDto.getUserOpen());
        userRepository.save(userEntity);
        return true;
    }

    public UserEntity getUserEntity(HttpServletRequest request){
        String userId = kakaoService.decodeToken(request.getHeader("accessToken"));
        Optional<UserEntity> userEntity = userRepository.findByUserId(userId);
        return userEntity.get();
    }

}
