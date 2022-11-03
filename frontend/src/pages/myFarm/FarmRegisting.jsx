import React, { useEffect, useState } from 'react'
import { Container, Fab, Box, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../atom';

const FarmRegisting = () => {
  const [user, setUser] = useRecoilState(userInfo)
  const navigate = useNavigate();

  // 디바이스 장치가 등록되어 있으면 myFarm로 이동 
  useEffect(() => {
    if (user.deviceId) {
      navigate('/myfarm')
    }
    if(!localStorage.getItem("reload")){
      localStorage.setItem("reload", true)
      window.location.reload()
    }
  }, [])


  const goFarmCreate = () => {
    navigate('/myfarm/create')
  }

  return (
    <>
      {/* <Container> */}
        <Box sx={{
          backgroundColor: "black",
          width: 350,
          height: 500,
          mt: 10,
          ml: 2.5
        }}>
          <Box>
            <Typography variant="h6" sx={{pt:10, textAlign:'center'}}>안녕하세요. 정석호님!</Typography>
            <Typography variant="h6" sx={{pt:1, textAlign:'center'}}>핸드팜에 오신 걸 환영합니다.</Typography>
          </Box>
          <Box sx={{mt:10}}>
            <Box sx={{display:'flex', justifyContent:'center'}}>
              <Fab size="medium" onClick={goFarmCreate}>
                <AddIcon />
              </Fab>
            </Box>
            <Typography variant="h6" sx={{textAlign:'center', mt:1}}>내 농장 등록하기</Typography>
          </Box>
        </Box>
      {/* </Container> */}
    </>
  )
}

export default FarmRegisting;