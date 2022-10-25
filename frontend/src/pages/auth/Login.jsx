import React from 'react';
import {KAKAO_AUTH_URL} from './OAuth';

export const Login = () => {
    return (
        <>
            <img src="handFarm.png" alt="핸드팜" 
            style={{width:'70vmin', height:'30vmin', paddingTop:'100px'}}/>
            <div className='Main-word'>
                <h3 style={{color:'#F24822'}}>원격으로 농장 관리와,</h3>
                <h3 style={{color:'#0D99FF'}}>커뮤니티 기능으로,</h3>
                <h3 style={{color:'#9747FF'}}>나의 농장
                    <span style={{color:'white'}}>을 관리해보세요!</span>
                </h3>
            </div>
            <button><a href={KAKAO_AUTH_URL}>카카오톡 로그인</a></button>
        </>
    );
};

export default Login;