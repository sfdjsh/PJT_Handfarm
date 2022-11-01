import React, { useEffect } from 'react';
import { AppBar, IconButton, Divider, Box, Badge } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/NotificationsNone';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useState } from 'react';
import AlarmModal from '../alarm/AlarmModal'

export const Header = () => {
  const location = window.location.pathname
  const token = localStorage.getItem('access_token') 
  const [alarmCount, setAlarmCount] = useState(0)

  useEffect(() => {
    axios({
      method: "GET",
      url: `${BASE_URL}/alarm/count`,
      headers: {
        accessToken: token
      }
    })
      .then(response => {
        console.log(response.data.noticeCount)
        setAlarmCount(response.data.noticeCount)
      })
  }, [])

  if (location === '/') {
    return <></>
  } else {
    return (
      <>
        <Box sx={{ display: "flex", justifyContent:"end", alignItems: "center", mt:1, mr:1 }}>
          <IconButton size='large' color='inherit'>
            <Badge badgeContent={alarmCount} color="error">
              < AlarmModal />
            </Badge>
          </IconButton>
        </Box>
      </>
    )
  }
}

export default Header;