import React, {useEffect} from 'react';
import { AppBar, IconButton, Divider, Box } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/NotificationsNone';
import { display } from '@mui/system';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";

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