import React from 'react';
import { KAKAO_AUTH_URL } from './OAuth';
import { Button } from '@mui/material'

export const Login = () => {
    return (
        <>
            <img src="HandFarm1.png" alt="핸드팜"
                style={{ width: '50vmin', height: '50vmin', paddingTop: '100px' }} />
            <div className='Main-word'>
                <h3 style={{ color: '#F24822' }}>원격으로 농장 관리와,</h3>
                <h3 style={{ color: '#0D99FF' }}>커뮤니티 기능으로,</h3>
                <h3 style={{ color: '#9747FF' }}>나의 농장
                    <span style={{ color: 'white' }}>을 관리해보세요!</span>
                </h3>
            </div>

            <Button>
                <a href={KAKAO_AUTH_URL}>
                    <img src="kakaoBUtton.png" alt="로그인" />
                </a>
            </Button>
        </>
    );
};

export default Login;