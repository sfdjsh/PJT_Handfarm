import React, { useEffect, useState } from 'react'
import { Container, Fab, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../atom';

const FarmRegisting = () => {
  const [isFarm, setIsFarm] = useRecoilState(userInfo)
  const navigate = useNavigate();

  // 디바이스 장치가 등록되어 있으면 myFarm로 이동 
  useEffect(() => {
    if (isFarm.deviceId) {
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
      <Container>
        <Box sx={{
          backgroundColor: "black",
          width: 350,
          height: 500,
          mt: 10
        }}>
          <div>
            <h3 style={{ marginTop: '50px' }}>안녕하세요. 정석호님!</h3>
            <h3>핸드팜에 오신걸 환영합니다.</h3>
          </div>
          <Box sx={{ mt: 10 }}>
            <Fab size="medium" onClick={goFarmCreate}>
              <AddIcon />
            </Fab>
            <h4>내 농장 등록하기</h4>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default FarmRegisting;