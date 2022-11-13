import React from 'react'
import { Typography, Box, Card, Slider, Button, InputAdornment, OutlinedInput, CardContent } from "@mui/material";
import { useState } from 'react';
import { sensorManual } from '../../../pages/api/MyFarm'

const TempDetail = ({ temp, deviceId }) => {
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
      <Card sx={{mt:2, backgroundColor: "#1E1E1E"}}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" flexGrow={1} fontWeight='bold' color="white">센서설정</Typography>
            <Typography color="#FFCD29">초기화</Typography>
          </Box>
          <hr />
          <Box sx={{mt:1}}>
          <Typography color="#FFA629" variant="subtitle2">
            * 온도를 설정하면 현재 온도가 설정한 범위를 벗어날 경우 조절하게 됩니다.
          </Typography>
          <Typography sx={{ mt: 1 }} color="#FFA629" variant="subtitle2">
            * 온도 설정 범위는 -10°C ~ 40°C 까지입니다.
          </Typography>    
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h7" color="white">최고 온도 설정</Typography>
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
            <Typography variant="h7" color="white">최저 온도 설정</Typography>
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
            >
              <h3>취소</h3>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default TempDetail