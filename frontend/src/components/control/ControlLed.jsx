import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, ButtonGroup, Button, Switch } from "@mui/material"
import './Control.css'
import { controlState, axiosDegree } from '../../pages/api/Control'
import axios from "axios";

const ControlLed = ({controlLed, deviceId}) => {
  let autoFan = controlLed.auto;
  let manualFan = controlLed.manual;

  const control = "led"
  const degree = [0, 1, 2, 3]

  const [switchState, setSwitchState] = useState(autoFan)
  const [ledDegree, setLedDegree] = useState(manualFan)

  useEffect(() => {
    controlState({switchState, control, deviceId})
  }, [switchState])

  function degreeChange(d) {
    setLedDegree(d)
    axiosDegree({d, control, deviceId})
  }
  return (
    <>
      <Card sx={{ mt: 1, height: 120, backgroundColor: "#1E1E1E" }}>
        <CardContent>
          <Typography variant="h7" color="white">
            LED
          </Typography>
          <Box display="flex">
            <Box flexGrow={1} alignItems="center" sx={{ p: 0 }}>
              <Switch color="warning"
                checked={switchState}
                onChange={() => {
                  if (switchState === 1) {
                    setSwitchState(0)
                  } else {
                    setSwitchState(1)
                  }
                }}
              />
                {
                  switchState === 1 ?
                    <span style={{ color: "white", fontSize: "12px" }}>자동</span> :
                    <span style={{ color: "white", fontSize: "12px" }}>수동</span>
                }
            </Box>
            <ButtonGroup
              sx={{ background: 'white', borderRadius: '20px' }}
              display="flex">
              <Button onClick={() => degreeChange(0)} variant="subtitle2"
                sx={{ borderRadius: '15px', m: 0.5, p: 0.5, fontWeight: 'bold' }}
              >
                <Typography className={ledDegree === degree[0] ? 'onCheck' : ''}>
                  OFF
                </Typography>
              </Button>
              <Button onClick={() => degreeChange(1)} variant="subtitle2"
                sx={{ borderRadius: '15px', m: 0.5, p: 0.5, fontWeight: 'bold' }}
              >
                <Typography className={ledDegree === degree[1] ? 'onCheck' : ''}>
                  1단계
                </Typography>
              </Button>
              <Button onClick={() => degreeChange(2)} variant="subtitle2"
                sx={{ borderRadius: '15px', m: 0.5, p: 0.5, fontWeight: 'bold' }}
                >
                <Typography className={ledDegree === degree[2] ? 'onCheck' : ''}>
                  2단계
                </Typography>
              </Button>
              <Button onClick={() => degreeChange(3)} variant="subtitle2"
                sx={{ borderRadius: '15px', m: 0.5, p: 0.5, fontWeight: 'bold' }}
                >
                <Typography className={ledDegree === degree[3] ? 'onCheck' : ''}>
                  3단계
                </Typography>
              </Button>
            </ButtonGroup>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default ControlLed