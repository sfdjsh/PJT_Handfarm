import React from 'react'
import { motorControl } from '../../../atom'
import { useRecoilState } from "recoil";
import ControlLed from "../control/ControlLed"
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
  Container,
  Box
} from "@mui/material";

const LedCard = ({ led, deviceId, value}) => {
  const [motorState, setMotorState] = useRecoilState(motorControl) 
  const controlLed = motorState.led
  console.log(led)
  return (
    <>
      {
        value == 4 ? 
        <Container>
          <ControlLed controlLed={controlLed} deviceId={deviceId} /> 
        </Container>
        : <></>
      }
    </>
  )
}

export default LedCard