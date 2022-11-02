import React, {useEffect} from 'react';
import Footer from '../../components/common/Footer';
import { useRecoilState, userRecoilState } from 'recoil';
import { userInfo } from '../../atom';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { socketStorage } from '../redux/action';


export const ChatList = () => {
    
    return(
        <>
            <div> <h1>채팅 페이지</h1> </div>
            <Footer />
        </>
    )
};

export default ChatList;