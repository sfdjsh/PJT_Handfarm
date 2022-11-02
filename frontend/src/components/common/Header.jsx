import React, { useEffect } from 'react';
import { IconButton, Box, Badge } from '@mui/material'
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useState } from 'react';
import AlarmModal from '../alarm/AlarmModal'

export const Header = () => {
  const location = window.location.pathname
  const [alarmCount, setAlarmCount] = useState(0)

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

  // 알람 정보 state에 저장
  // useEffect

  if (location === '/' || location === '/kakao') {
    return <></>
  } else {
    return (
      <>
        <Box sx={{ display: "flex", justifyContent:"end", alignItems: "center", mt:1, mr:1 }}>
          <IconButton size='large' color='inherit'>
            <Badge badgeContent={alarmCount} color="error">
              <AlarmModal />
            </Badge>
          </IconButton>
        </Box>
      </>
    )
  }
}

export default Header;