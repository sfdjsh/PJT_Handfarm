import React from 'react'
import { motorControl } from '../../../atom'
import { useRecoilState } from "recoil";
import ControlLed from "../control/ControlLed"
import LedDetail from './LedDetail';
import { Container } from "@mui/material";

const LedCard = ({ deviceId, value }) => {
  const [motorState, setMotorState] = useRecoilState(motorControl) 
  const controlLed = motorState.led
  return (
    <>
      {
        value === 5 ? 
        <Container>
          <LedDetail deviceId={deviceId}/>
          <ControlLed controlLed={controlLed} deviceId={deviceId} /> 
        </Container>
        : <></>
      }
    </>
  )
}

export default LedCard