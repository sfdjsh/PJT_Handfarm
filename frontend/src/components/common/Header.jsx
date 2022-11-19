import React, {useEffect} from 'react';
import { AppBar, IconButton, Divider, Box } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/NotificationsNone';
import { display } from '@mui/system';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Grid} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../config";
import {Badge} from "@mui/material";
import AlarmModal from "../alarm/AlarmModal";
import {chatAnother} from "../../atom";
import {useRecoilState} from "recoil";


export const Header = () => {
  const navigator = useNavigate()
  const location = window.location.pathname
  const [alarmCount, setAlarmCount] = useState(0)
    const [nowAnotherUser, setNowAnotheruser] = useRecoilState(chatAnother)
  // console.log(location.split('/'))
  // 알람 갯수 로직
  useEffect(() => {
    if(location !== '/'){
        axios({
          method: "GET",
          url: `${BASE_URL}/alarm/count`,
          headers: {
            accessToken: localStorage.getItem('access_token')
          }
        })
          .then(response => {
            setAlarmCount(response.data.noticeCount)
            location.reload()
          })
    }
  }, [])

  if (location === '/' || location === '/kakao') {
    return <></>
  } else {
    return (
      <>
        <Grid container sx={{ zIndex : 100, backgroundColor : "#212528" ,display: "flex", justifyContent:"end", alignItems: "center", position : "sticky", top : 0 }}>
          { location.split('/')[1] === 'chat' ? (
              <>
                <Grid item xs={2} sx={{ display : "flex", justifyContent : "center", alignItems : "center" }}>
                  <ArrowBackIosIcon onClick={() => {
                    navigator(-1)
                  }}/>
                </Grid>
                <Grid item xs={8} sx={{ display : "flex", justifyContent : "center", alignItems : "center", fontSize : "22px" }}>
                  {nowAnotherUser}
                </Grid>
              </>
          ) : (
              <>
                <Grid item xs={2} sx={{ display : 'flex', justifyContent : "center", alignItems : "center" }}>
                  <ArrowBackIosIcon onClick={() => {
                    navigator(-1)
                  }}/>
                </Grid>
                <Grid item xs={8} sx={{ display : "flex", justifyContent : "center", alignItems : "center", fontSize : "22px" }}>
                </Grid>
              </>
          ) }
          <Grid item xs={2}>
            <IconButton size='large' color='inherit'>
              <Badge badgeContent={alarmCount} color="error">
                <AlarmModal />
              </Badge>
            </IconButton>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default Header;