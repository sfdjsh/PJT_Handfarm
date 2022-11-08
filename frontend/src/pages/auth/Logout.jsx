import axios from "axios";
import React from "react";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfo } from "../../atom";
import { Box, Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
  const navigate = useNavigate();

  const [LoggedIn, setLoggedIn] = useRecoilState(userInfo);
  console.log(LoggedIn);

  const kakaoLogout = () => {
    axios({
      method: "GET",
      url: `${BASE_URL}/kakao/logout`,
      headers: {
        Authorization: localStorage.getItem("access_token"),
      },
    }).then(() => {
      localStorage.setItem("access_token", "");
      localStorage.removeItem("reload");
      navigate("/");
    });
  };

  return (
    <Box sx={{ mt: 5 }}>
      <h2>계정 관리</h2>
      <hr />
      <Box display="flex" alignItems="center">
        <Button sx={{ fontSize: 18, color: "white", p: 0, mt: 1 }}
        onClick={kakaoLogout}
        >
          <h3 style={{ marginRight: "10px" }}>로그아웃</h3>
          <LogoutIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Logout;
