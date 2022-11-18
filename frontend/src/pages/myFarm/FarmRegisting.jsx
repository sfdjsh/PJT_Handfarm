import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Fab, Box, Typography } from '@mui/material'
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
  const onFarm = async () => {
    const result = await axios.get('https://handfarm.co.kr/api/farm', {
      headers: {
        accessToken: localStorage.getItem('access_token')
      }
    })
    setMyFarm(result.data)
    if (myFarm.deviceInfo.length > 0) {
      navigate('/myfarm')
    }
  }

  useEffect(() => {
    onFarm()
  }, [myFarm])

  const goFarmCreate = () => {
    navigate('/myfarm/create')
  }
  
  console.log(myFarm)
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


// diviceInfo : [
//   {"deviceNo" : [
//   {'D30': { "deviceLatitude": 35.2058, "cropName": "딸기", "deviceCamera": "https://5c8d-121-147-32-194.jp.ngrok.io/stream", "deviceNo": "D30", "deviceName": "지니 농장", "deviceLong": 126}},
//   {'D33': { "deviceLatitude": 35.2058, "cropName": "딸기", "deviceCamera": "https://5c8d-121-147-32-194.jp.ngrok.io/stream", "deviceNo": "D30", "deviceName": "지니 농장", "deviceLong": 126}},
//   ]}
// ]

// // deviceInfo : [{deviceNo: [{'D30': }]}]

// test.deviceInfo.map((farm) => {
//   console.log(farm.cropName)
// })