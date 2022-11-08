import React, { useEffect } from 'react';
import axios from 'axios'
import { useRecoilState } from 'recoil';
import { userInfo } from '../../atom';
import { useNavigate } from 'react-router-dom';

export const Kakao = () => {
  const navigate = useNavigate();

  let params = new URL(document.URL).searchParams
  let code = params.get("code")

  const [user, setUser] = useRecoilState(userInfo)

  useEffect(() => {
    axios.get(`https://handfarm.co.kr/api/kakao?code=${code}`)
      .then(response => {
        console.log(response.data)
        const accessToken = response.data.userInfo.accessToken
        if (accessToken) {
          localStorage.setItem('access_token', accessToken)
          setUser({
            refreshToken: response.data.userInfo.refreshToken,
            isLoggedIn: true,
            isRegisted: response.data.isRegisted,
            userNickname: response.data.userInfo.userNickname,
            deviceId: response.data.userInfo.deviceInfo,
            userEmail: response.data.userId
          })
        }
      })
        .then(() => {
          const renderFarm = user.deviceId
          if (renderFarm) {
            navigate('/myfarm')
          } else {
            navigate('/myfarm/registing')
          }
        })
  }, [])

  return (
    <div>
      <h1>잠시만 기다려주세요</h1>
    </div>
  );
};

export default Kakao;