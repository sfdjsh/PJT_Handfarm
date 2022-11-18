import React, { useEffect } from 'react'
import axios from 'axios'
import { Fab, Box, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userFarm, userInfo } from '../../atom';

const FarmRegisting = () => {
  const navigate = useNavigate()
  const [myFarm, setMyFarm] = useRecoilState(userFarm)

  const [user, setUser] = useRecoilState(userInfo)
  const nickName = user.userNickname
  
  // 내 농장 정보
  const onFarm = () => {
    axios.get('https://handfarm.co.kr/api/farm', {
      headers: {
        accessToken: localStorage.getItem('access_token')
      }
    })
      .then(response => {
        setMyFarm(response.data)
      })
  }

  useEffect(() => {
    onFarm();
  }, [myFarm])

  if (myFarm && myFarm.deviceNo) {
    const deviceId = myFarm.deviceNo[0]
    navigate(`/myfarm/${deviceId}`)
  }

  const goFarmCreate = () => {
    navigate('/myfarm/create')
  }

  return (
    <>
      <Box sx={{
        backgroundColor: "black",
        width: 350,
        height: 500,
        mt: 10,
        ml: 2.5
      }}>
        <Box>
          <Typography variant="h6" sx={{ pt: 10, textAlign: 'center' }}>안녕하세요. {nickName}님!</Typography>
          <Typography variant="h6" sx={{ pt: 1, textAlign: 'center' }}>핸드팜에 오신 걸 환영합니다.</Typography>
        </Box>
        <Box sx={{ mt: 10 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Fab size="medium" onClick={goFarmCreate}>
              <AddIcon />
            </Fab>
          </Box>
          <Typography variant="h6" sx={{ textAlign: 'center', mt: 1 }}>내 농장 등록하기</Typography>
        </Box>
      </Box>
    </>
  )
}

export default FarmRegisting;
