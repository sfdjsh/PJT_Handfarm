import axios from "axios";
import React from "react";
import {BASE_URL} from "../../config";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfo } from '../../atom';

const Logout = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access_token')
  
  const [LoggedIn, setLoggedIn] = useRecoilState(userInfo)
  console.log(LoggedIn)
  
  const kakaoLogout = () => {
    axios({
      method: 'GET',
      url: `${BASE_URL}/kakao/logout`,
      headers: {
        Authorization : accessToken
      }
    })
      .then(() => {
        localStorage.setItem('access_token', '')
        navigate('/')
      })
  }

  return (
    <button onClick={kakaoLogout}>로그아웃</button>
  )
}

export default Logout