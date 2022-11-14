import React, {useState} from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import GiteOutlinedIcon from '@mui/icons-material/GiteOutlined';
import styled from 'styled-components';
import Divider from "@mui/material/Divider";
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {userInfo} from '../../atom'
import PeopleIcon from '@mui/icons-material/People';

const useStyles = makeStyles({
    root: {
        width: "100vw",
        fontFamily : "ScoreDream"
    },
});

export const Footer = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0)
    const navigator = useNavigate();
    const [user, setUser] = useRecoilState(userInfo)

    return (
        <>
            <Box>
                <Divider style={{ backgroundColor : "white" }}/>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    className={classes.root}
                    style={{ backgroundColor : "#212528" }}
                >
                    <BottomNavigationAction style={{ color : "white" }} onClick={() => {
                        navigator('/myfarm')
                    }}  label="농장" icon={<GiteOutlinedIcon />} />
                    <BottomNavigationAction style={{ color : "white" }} onClick={() => {
                        navigator('/community')
                    }}  label="커뮤니티" icon={<PeopleIcon />} />
                    <BottomNavigationAction style={{ color : "white" }} onClick={() => {
                        navigator('/chatList')
                    }}  label="톡톡"  icon={<ChatBubbleOutlineIcon />} />
                    <BottomNavigationAction style={{ color : "white" }} onClick={() => {
                        navigator(`/mypage/${user.userNickname}`)
                    }}  label="프로필" icon={<PermIdentityOutlinedIcon />} />
                </BottomNavigation>
            </Box>
        </>
    );
};

export default Footer;