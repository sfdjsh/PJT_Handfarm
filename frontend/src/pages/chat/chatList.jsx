import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import {useEffect} from "react";
import { fetchMyChattingRooms } from '../api/Chatting';

import { useRecoilState, userRecoilState } from 'recoil';


export const ChatList = () => {
    const token = localStorage.getItem('access_token'); // 엑세스 토큰 정보
    const [chatList, setChatList] = useState([]); // 채팅 리스트 저장
    
    useEffect(() => {
         fetchMyChattingRooms()
        .then((res) => res.json().then((res) => {
            console.log(res)
            setChatList(res)
        }))
    },[])
    
    return(
        <>
            <Box>
                <Typography sx={{ fontWeight : "bold", mt : 5, textAlign : "center" }} variant="h4" component="h3">FarmTalk</Typography>
                <Divider style={{ mt : 2, backgroundColor : "#757575" }}/>
            </Box>
        </>
    )
};

export default ChatList;