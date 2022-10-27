import React, {useEffect} from 'react';
import axios from 'axios'
import { useRecoilState } from 'recoil';
import { isLogin } from '../../atom';
import { useNavigate } from 'react-router-dom';

export const Kakao = () => {
    const navigate = useNavigate();

    let params = new URL(document.URL).searchParams
    let code = params.get("code")
    console.log(code)
  
    const [user, setUser] = useRecoilState(isLogin)

    useEffect(() => { 
        axios.get(`https://handfarm.co.kr/api/kakao?code=${code}`)
            .then(response => {
              console.log(response.data)
              localStorage.setItem('access_token', response.data.userInfo.accessToken)
              setUser({
                isLoggedIn: true,
                isRegisted: response.data.isRegisted,
                userNickname: response.data.userInfo.userNickname,
                deviceId: response.data.userInfo.deviceId
              })
            })
            console.log(user)
    }, [])
    
    const renderFarm = () => {
      if (user.deviceId) {
        navigate('/myfarm/registing')
      } else {
        navigate('/myfarm')
      }
    }

    return (
        <div>
            <h1>잠시만</h1>
            {renderFarm()}
        </div>
    );
};

export default Kakao;