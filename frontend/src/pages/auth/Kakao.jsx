import React, { useEffect } from 'react';
import axios from 'axios'
import { useRecoilState } from 'recoil';
import { userInfo } from '../../atom';
import { useNavigate } from 'react-router-dom';

export const Kakao = () => {
  const navigate = useNavigate();

  let params = new URL(document.URL).searchParams
  let code = params.get("code")
  console.log(code)

  // const accessToken = ''
  const [user, setUser] = useRecoilState(userInfo)  

  const getKakao = () => {
    axios.get(`https://handfarm.co.kr/api/kakao?code=${code}`)  
      .then(response => {
        console.log(response.data)
        const accessToken = response.data.userInfo.accessToken
        if (accessToken) {
          localStorage.setItem('access_token', accessToken)
          setUser({
            isLoggedIn: true,
            isRegisted: response.data.isRegisted,
            userNickname: response.data.userInfo.userNickname,
            deviceId: response.data.userInfo.deviceId
          })
        }
      })
  }
  // useEffect(() => { 
  //     axios.get(`https://handfarm.co.kr/api/kakao?code=${code}`)
  //         .then(response => {
  //           console.log(response.data)
  //           const accessToken = response.data.userInfo.accessToken
  //           if (accessToken) {
  //             localStorage.setItem('access_token', accessToken)
  //           }
  //           setUser({
  //             isLoggedIn: true,
  //             isRegisted: response.data.isRegisted,
  //             userNickname: response.data.userInfo.userNickname,
  //             deviceId: response.data.userInfo.deviceId
  //           })
  //         })
  // }, [user])

  // const renderFarm = () => {
  //   if (user.deviceId) {
  //     navigate('/myfarm/registing')
  //   } else {
  //     navigate('/myfarm')
  //   }
  // }

  useEffect(() => {
    getKakao()
  })

  return (
    <div>
      <h1>잠시만</h1>
      {/* {renderFarm()} */}
    </div>
  );
};

export default Kakao;