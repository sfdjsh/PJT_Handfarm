import React, {useState} from 'react';
import './MyPage.css'
import MyPageFarm from './MyPageFarm';
import MyPageArticle from './MyPageArticle';
import MyPageSetting from './MyPageSetting';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../atom';
import { Avatar, Typography, Container, Box, Switch } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const MyPage = () => {
    const [nickName, setNickname] = useRecoilState(userInfo)
    const [myPageLook, setMyPageLook] = useState('Farm')
    
    return (
        <>
            <Container sx={{ mt: 2 }}>
                <Box>
                    <Box display="flex" alignItems="center">
                        <Box display="flex" alignItems="center" flexGrow={1}>
                            <Avatar alt="Profile Img" src="assets/img/handFarm.png"
                                sx={{ width: 50, height: 50 }}>
                            </Avatar>
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="h6">{nickName.userNickname}</Typography>
                                <Box display="flex" alignItems='center'>
                                    <MailOutlineIcon />
                                    <Typography variant="subtitle2">채팅 보내기</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Switch color="warning"></Switch>
                        <MyPageSetting nickName={nickName.userNickname}/>
                    </Box>
                </Box>
                <Box sx={{mt:10}} display="flex" justifyContent="space-around">
                    <Typography variant='h5' 
                    onClick={() => setMyPageLook('Farm')}
                    className={myPageLook==='Farm'?('look-on'):('look-off')}>농장</Typography>
                    <Typography variant='h5'
                    onClick={() => setMyPageLook('Article')}
                    className={myPageLook==='Article'?('look-on'):('look-off')}>작성한 게시글</Typography>
                </Box>
                {myPageLook==='Farm'? (<MyPageFarm />) : (<MyPageArticle />)}
            </Container>
        </>
    );
};

export default MyPage;