import React from 'react'
import { useRecoilState } from "recoil";
import { tempModal } from '../../atom'
import { Typography, Modal, Box, Card, Slider, Button, InputAdornment, OutlinedInput } from "@mui/material";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import { useState } from 'react';
import { sensorManual } from '../../pages/api/MyFarm'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  height: 700,
  bgcolor: "#212528",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TempDetail = ({ temp, deviceId }) => {
  const [onTemp, setOnTemp] = useRecoilState(tempModal)
  const [highTemp, setHighTemp] = useState(25)
  const [lowTemp, setLowTemp] = useState(10)

  // 슬라이더 최저 온도 설정
  const lowTempSlider = (event, newValue) => {
    if (typeof newValue === 'number') {
      setLowTemp(newValue)
    }
  }

  // 슬라이더 최고 온도 설정
  const highTempSlider = (event, newValue) => {
    if (typeof newValue === 'number') {
      setHighTemp(newValue)
    }
  }

  return (
    <>
      <Modal
        open={onTemp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" textAlign="end"
            onClick={() => { setOnTemp(false) }}
          >
            X
          </Typography>

          <Box display='flex' alignItems="center" sx={{ mt: 2 }}>
            <DeviceThermostatOutlinedIcon />
            <Typography flexGrow={1} variant="h6" fontWeight="bold">
              Temp
            </Typography>
            <Typography variant="h5" textAlign="end" color="#F24822" fontWeight="bold">
              {temp}°C
            </Typography>
          </Box>
          <hr />

          <Card sx={{ height: 140, mt: 1 }}>
            <p>그래프 영역</p>
          </Card>

          <Box display="flex" alignItems="center" sx={{ mt: 4 }}>
            <Typography variant="h6" flexGrow={1} fontWeight='bold' >센서설정</Typography>
            <Typography color="#FFCD29">초기화</Typography>
          </Box>
          <hr />
          <Typography color="#FFA629" variant="subtitle2">
            * 온도를 설정하면 현재 온도가 설정한 범위를 벗어날 경우 조절하게 됩니다.
          </Typography>
          <Typography sx={{ mt: 1 }} color="#FFA629" variant="subtitle2">
            * 온도 설정 범위는 -10°C ~ 40°C 까지입니다.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h7">최고 온도 설정</Typography>
            <Box display="flex" justifyContent="space-between">
              <Slider
                value={highTemp}
                aria-label="Default"
                valueLabelDisplay="auto"
                sx={{ mr: 2 }}
                min={-10}
                max={40}
                onChange={highTempSlider}
              />
              <OutlinedInput
                value={highTemp > 40 || highTemp < -10 ? 40 : highTemp}
                type='number'
                id="outlined-start-adornment"
                size='small'
                endAdornment={<InputAdornment fontWeight='bold'>°C</InputAdornment>}
                sx={{ background: 'white', width: '15ch', fontWeight: 'bold' }}
                onChange={(e) => setHighTemp(e.target.value)}
              />
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h7">최저 온도 설정</Typography>
            <Box display="flex" justifyContent="space-between">

              <Slider
                value={lowTemp}
                aria-label="Default"
                valueLabelDisplay="auto"
                sx={{ mr: 2 }}
                min={-10}
                max={40}
                onChange={lowTempSlider}
              />

              <OutlinedInput
                value={-10 < lowTemp < 40? lowTemp : -10}
                type='number'
                id="outlined-start-adornment"
                size='small'
                endAdornment={<InputAdornment fontWeight='bold'>°C</InputAdornment>}
                sx={{ background: 'white', width: '15ch', fontWeight: 'bold' }}
                onChange={(e) => setLowTemp(e.target.value)}
              />
            </Box>
          </Box>

          <Box sx={
            { display: 'flex', justifyContent: 'center', mt:4 }}>
            <Button variant="contained" 
            sx={{ width: 80, height: 60, mr: 4, background: '#424B5A' }}
            onClick={() => sensorManual({ deviceId, highTemp, lowTemp })}
            >
              <h3>등록</h3>
            </Button>
            <Button variant="contained" 
            sx={{ width: 80, height: 60, background: '#757575' }}
            onClick={() => setOnTemp(false)}>
              <h3>취소</h3>
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default TempDetail