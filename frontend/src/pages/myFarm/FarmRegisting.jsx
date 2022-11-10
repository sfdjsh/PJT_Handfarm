import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Fab, Box, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userFarm } from '../../atom';

const FarmRegisting = () => {
  const navigate = useNavigate()
  const [myFarm, setMyFarm] = useRecoilState(userFarm)
  console.log(myFarm)
  // 내 농장 정보
  const onFarm = async () => {
    const result = await axios.get('https://handfarm.co.kr/api/farm', {
      headers: {
        accessToken: localStorage.getItem('access_token')
      }
    })
    // console.log(result.data)
    setMyFarm(result.data)
    // console.log(myFarm)

  }
  if (myFarm.deviceInfo.length > 0) {
      navigate('/myfarm')
    }
    
  useEffect(() => {
    onFarm()
  }, [myFarm])

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
          <Typography variant="h6" sx={{ pt: 10, textAlign: 'center' }}>안녕하세요. 정석호님!</Typography>
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