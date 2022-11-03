import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
// import instance from '../../utils/axiosConfig';
import Box from "@mui/material/Box";
import {userInfo} from "../../atom";
import {useRecoilState} from "recoil";
import {Button, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import './chatting.css'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Avatar from '@mui/material/Avatar';

export function CreateReadChat() {
    const [chatList, setChatList] = useState([]);
    const [chat, setChat] = useState('');
    const [nowUser, setNowUser] = useRecoilState(userInfo)
    const  apply_id  = 28
    const client = useRef({});
    console.log(chatList)
    console.log(chat)
    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: 'ws://localhost:8081/ws',
            onConnect: () => {
                console.log('success');
                subscribe();
            },
        });
        client.current.activate();
    };

    const publish = (chat) => {
        if (!client.current.connected) return;

        client.current.publish({
            destination: '/pub/chat',
            body: JSON.stringify({
                roomId: apply_id,
                msg : chat,
                toUserNickname : "승우",
                sendUserNickname : nowUser.userNickname
            }),
        });

        setChat('');
    };

    const subscribe = () => {
        client.current.subscribe('/sub/chat/' + apply_id, (body) => {
            const json_body = JSON.parse(body.body);
            setChatList((_chat_list) => [
                ..._chat_list, json_body
            ]);
        });
    };

    const disconnect = () => {
        client.current.deactivate();
    };

    const handleChange = (event) => { // 채팅 입력 시 state에 값 설정
        setChat(event.target.value);
    };

    const handleSubmit = (event, chat) => { // 보내기 버튼 눌렀을 때 publish
        event.preventDefault();

        publish(chat);
    };

    useEffect(() => {
        connect();

        return () => disconnect();
    }, []);

    return (
        <div>
            {/*<div className={'chat-list'}>{chatList}</div>*/}
            <Box className="wrap">
                { chatList.map((chatting, index) => (
                     chatting.sendUserNickname === nowUser.userNickname ? (
                         <Box className="chat ch2">
                            <Box className="textbox" key={index} sx={{ color : 'black' }} >{ chatting.msg }</Box>
                         </Box>
                     )  : (
                         <Box className="chat ch1" key={index} sx={{ display : "flex",justifyContent : "left",  color : "black"}}>
                             <Avatar alt="https://img1.daumcdn.net/thumb/R300x0/?fname=https://k.kakaocdn.net/dn/c3vWTf/btqUuNfnDsf/VQMbJlQW4ywjeI8cUE91OK/img.jpg" src="https://s3.orbi.kr/data/file/united/8b2a7bd120d1f7c738bb5cfc47156e90.jpeg" />
                                 {/*<Box style={{ color : "white" }}>강현</Box>*/}
                                 <Box className="textbox">
                                     { chatting.msg }
                                 </Box>
                         </Box>
                     )
                )) }
            </Box>
            {/*<form onSubmit={(event) => handleSubmit(event, chat)}>*/}
            {/*    <div>*/}
            {/*        <input type={'text'} name={'chatInput'} onChange={handleChange} value={chat} />*/}
            {/*    </div>*/}
            {/*    <input type={'submit'} value={'의견 보내기'} />*/}
            {/*</form>*/}
            <Grid container spacing={1} sx={{
                width : "100vw",
                position : "fixed",
                bottom : 0,
                backgroundColor : "#212528",
                marginLeft : "0px",
                border  : "1px solid #B3B3B3"
            }}>
                <Grid item xs={9}>
                    <TextField
                        type={'text'} name={'chatInput'} onChange={handleChange} value={chat}
                        fullWidth
                        sx={{
                            ' .MuiOutlinedInput-root': {
                                color: 'black',
                                border : '0px solid #B3B3B3',
                                backgroundColor : "#B3B3B3",
                                fontFamily : "ScoreDream"
                            },
                            mb : 1
                        }}
                        placeholder=""
                    />
                </Grid>
                <Grid item xs={3} sx={{ paddingLeft : "16px" }}>
                    <Button variant="contained" style={{
                        backgroundColor : "#FFA629",
                        marginTop : "9px",
                        marginLeft : "10px",
                        fontFamily : "ScoreDream"
                    }}
                            onClick={(event) => {
                                handleSubmit(event, chat)
                            }}
                    >작성</Button>
                </Grid>
            </Grid>
        </div>
    );
}