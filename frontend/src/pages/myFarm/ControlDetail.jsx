import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../config';
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import {
  Button, Typography, Modal, Box, Card, Slider, TextField, ButtonGroup, Switch, Container,
  CardContent, CardActions, ToggleButtonGroup, ToggleButton, Avatar
} from '@mui/material'
import './ControlDetail'
import { useRecoilState } from "recoil";
import { motorModal, motorControl } from "../../atom";
import ControlTemp from '../../components/control/ControlTemp';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: 700,
  bgcolor: '#212528',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ControlDetail = () => {
  const [onControl, setOnControl] = useRecoilState(motorModal)
  const [motorState, setMotorState] = useRecoilState(motorControl)  
  const handleClose = () => setOnControl(false);

  let controlTemp = motorState.temp
  // console.log(controlTemp)

  return (
    <>
      <Modal
        open={onControl}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" textAlign="end"
            onClick={handleClose}>
            X
          </Typography>

          <Typography flexGrow={1} variant="h6">제어 설정</Typography>
          <hr />

          <Box>
            <Typography sx={{fontSize:12}}>현재온도: 20C</Typography>
            <Typography sx={{fontSize:12}}>습도: 30%</Typography>
            <Typography sx={{fontSize:12}}>일단 대기: 30%</Typography>
          </Box>

          <ControlTemp controlTemp={controlTemp} />

          {/* <div>
            {lstMotor && lstMotor.map((control) => (
             <div key={control}>
              <p>{control.buzzer.auto}</p>
             </div> 
            ))}
          </div> */}
          {/* <Card sx={{ mt: 1, height: 100, backgroundColor: "#1E1E1E" }}>
            <CardContent>
              <Typography variant="h7" color="white">온풍기</Typography>
              <Box display="flex">
                <Box flexGrow={1} alignItems="center" sx={{ pl: '' }}>
                  <Switch defaultChecked color="warning" /><span style={{ color: 'white', fontSize:'12px' }}>수동</span>
                </Box>
                <Box >
                  <ButtonGroup
                    variant="outlined"
                    aria-label="Disabled elevation buttons"
                  >
                    <Button>On</Button>
                    <Button>OFF</Button>
                  </ButtonGroup>
                </Box>
              </Box>
              <Typography sx={{ mt: 1 }} fontSize={1} color="#FFA629">* 온도를 높일 수 있습니다.</Typography>
            </CardContent>
          </Card>

          <Card sx={{ mt: 1, height: 100, backgroundColor: "#1E1E1E" }}>
            <CardContent>
              <Typography variant="h7" color="white">냉풍기</Typography>
              <Box display="flex">
                <Box flexGrow={1} alignItems="center" sx={{ pl: '' }}>
                  <Switch defaultChecked color="warning" /><span style={{ color: 'white', fontSize:'12px' }}>수동</span>
                </Box>
                <Box >
                  <ButtonGroup
                    variant="outlined"
                    aria-label="Disabled elevation buttons"
                  >
                    <Button>On</Button>
                    <Button>OFF</Button>
                  </ButtonGroup>
                </Box>
              </Box>
              <Typography sx={{ mt: 1 }} fontSize={1} color="#FFA629">* 온도를 낮출 수 있습니다.</Typography>
            </CardContent>
          </Card>

          <Card sx={{ mt: 1, height: 100, backgroundColor: "#1E1E1E" }}>
            <CardContent>
              <Typography variant="h7" color="white">스프링쿨러</Typography>
              <Box display="flex">
                <Box flexGrow={1} alignItems="center">
                  <Switch defaultChecked color="warning" /><span style={{ color: 'white', fontSize:'12px' }}>수동</span>
                </Box>
                <Box >
                  <ButtonGroup
                    variant="outlined"
                    aria-label="Disabled elevation buttons"
                  >
                    <Button>On</Button>
                    <Button>OFF</Button>
                  </ButtonGroup>
                </Box>
              </Box>
              <Typography sx={{ mt: 1 }} fontSize={1} color="#FFA629">* 토양의 습도를 조절할 수 있습니다.</Typography>
            </CardContent>
          </Card>

          <Card sx={{ mt: 1, height: 100, backgroundColor: "#1E1E1E" }}>
            <CardContent>
              <Typography variant="h7" color="white">LED</Typography>
              <Box display="flex">
                <Box flexGrow={1} alignItems="center">
                  <Switch defaultChecked color="warning" /><span style={{ color: 'white', fontSize:'12px' }}>수동</span>
                </Box>
                <Box >
                  <ButtonGroup
                    variant="outlined"
                    aria-label="Disabled elevation buttons"
                  >
                    <Button>On</Button>
                    <Button>OFF</Button>
                  </ButtonGroup>
                </Box>
              </Box>
              <Typography sx={{ mt: 1 }} fontSize={1} color="#FFA629">* 빛의 세기를 조절할 수 있습니다.</Typography>
            </CardContent>
          </Card> */}

        </Box>
      </Modal>
    </>
  )
}

{/* <Container>
                <Typography variant="h6" color="black" >온풍기</Typography>
                <Box display="flex" justifyContent="space-betwe en">
                  <Switch defaultChecked color="warning" flexGrow={1}  /><span color='black'>수동</span>
                  <ButtonGroup
                    disableElevation
                    variant="outlined"
                    aria-label="Disabled elevation buttons"
                  >
                    <Button>ON</Button>
                    <Button>OFF</Button>
                  </ButtonGroup>
                </Box>
                <Typography color="#FFCD29" fontSize={1}>* 온도를 높일 수 있습니다.</Typography>
              </Container> */}

export default ControlDetail