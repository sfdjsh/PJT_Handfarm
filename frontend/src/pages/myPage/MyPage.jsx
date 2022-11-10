import React, {useState} from 'react';
import './MyPage.css'
import MyPageFarm from './MyPageFarm';
import MyPageArticle from './MyPageArticle';
import MyPageSetting from './MyPageSetting';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../atom';
import { Avatar, Typography, Container, Box, Switch } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {useEffect} from "react";
import {fetchUserInfo} from "../api/MyPage";
import BasicCard from "../../components/common/Card";

const MyPage = () => {
    const [nickName, setNickname] = useRecoilState(userInfo)
    const [myPageLook, setMyPageLook] = useState('Farm')
    const [userArticle, setUserArticle] = useState([])
    console.log(userArticle)

    useEffect(() => {
        fetchUserInfo()
            .then((res) => res.json().then((res) => {
                console.log(res)
                setUserArticle(res.userArticle)
            }))
    },[])

    
    return (
        <>
            <Container sx={{ mt: 2 }}>
                <Box>
                    <Box display="flex" alignItems="center">
                        <Box sx={{ display : "flex", alignItems : "center", fontFamily : "ScoreDream" }} flexGrow={1}>
                            <Avatar alt="Profile Img" src="assets/img/handFarm.png"
                                sx={{ width: 50, height: 50 }}>
                            </Avatar>
                            <Box sx={{ ml: 2 }}>
                                <Typography sx={{ fontFamily : "ScoreDream" }} variant="h6">{nickName.userNickname}</Typography>
                                <Box display="flex" alignItems='center'>
                                    <MailOutlineIcon />
                                    <Typography variant="subtitle2" sx={{ fontFamily : "ScoreDream" }}>채팅 보내기</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Switch color="warning"></Switch>
                        <MyPageSetting style={{ fontFamily : "ScoreDream" }} nickName={nickName.userNickname}/>
                    </Box>
                </Box>
                <Box sx={{mt:10}} display="flex" justifyContent="space-around">
                    <Typography variant='h5' 
                    onClick={() => setMyPageLook('Farm')}
                                sx={{ fontFamily : "ScoreDream" }}
                    className={myPageLook==='Farm'?('look-on'):('look-off')}>농장</Typography>
                    <Typography variant='h5'
                    onClick={() => setMyPageLook('Article')}
                                sx={{ fontFamily : "ScoreDream" }}
                    className={myPageLook==='Article'?('look-on'):('look-off')}>작성한 게시글</Typography>
                </Box>
                {myPageLook==='Farm' ? (<MyPageFarm />) : (
                    <>
                        {userArticle.map((article, index) => (
                            <BasicCard
                                key={index}
                                title={article.articleTitle}
                                idx={article.idx}
                                content={article.articleContent}
                                likeCount={article.likeCount}
                                commentCount={article.commentCount}
                            />

                        ))}
                    </>
                )}
            </Container>
        </>
    );
};

export default MyPage;