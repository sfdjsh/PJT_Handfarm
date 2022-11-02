import React, { useEffect } from 'react';
import { IconButton, Box, Badge } from '@mui/material'
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useState } from 'react';
import AlarmModal from '../alarm/AlarmModal'

export const Header = () => {
  const location = window.location.pathname
  const token = localStorage.getItem('access_token') 
  const [alarmCount, setAlarmCount] = useState(0)

  // 알람 갯수 로직
  const getTest = async () => {
    const posts = await axios({
      method: "GET",
      url: `${BASE_URL}/alarm/count`,
      headers: {
        accessToken: token
      }
    })
    setAlarmCount(posts)
  }

  useEffect(() => {
    getTest()
  }, [])
  // useEffect(async () => {
  //   const test = await axios({
  //     method: "GET",
  //     url: `${BASE_URL}/alarm/count`,
  //     headers: {
  //       accessToken: token
  //     }
  //   }, [])
  //     .then(response => {
  //       console.log(response.data.noticeCount)
  //       setAlarmCount(response.data.noticeCount)
  //     })
  // })

  // 알람 정보 state에 저장
  // useEffect

  if (location === '/') {
    return <></>
  } else {
    return (
    <>
      <Grid container spacing={1}>
          <Grid item xs={6} sx={{ display : "flex", justifyContent : "start", alignItems : "center" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;<ArrowBackIosIcon onClick={() => navigator(-1)}/>
          </Grid>
          <Grid item xs={6} sx={{ display:"flex", justifyContent:"end", alignItems:"center" }}>
              <IconButton size='large' color='inherit'>
              <Badge badgeContent={alarmCount} color="error">
              < AlarmModal />
            </Badge>
          </IconButton>
          </Grid>
      </Grid>
    </>
  )
  }
}
export default Header;