import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, ButtonGroup, Button, Switch } from "@mui/material"
import './Control.css'
import { controlState, axiosDegree } from '../../pages/api/Control'

const ControlFan = ({controlFan, deviceId}) => {
  const control = "fan"
  const degree = [0, 1, 2, 3]

  let autoFan = controlFan.auto;
  let manualFan = controlFan.manual;

  const [switchState, setSwitchState] = useState(autoFan)
  const [fanDegree, setFanDegree] = useState(manualFan)
  
  console.log(switchState)
  useEffect(() => {
    controlState({switchState, control, deviceId})
  }, [switchState])

  function degreeChange(d) {
    setFanDegree(d)
    axiosDegree({d, control, deviceId})
  }
  return (
    <>
      <Card sx={{ mt: 1, height: 120, backgroundColor: "#1E1E1E" }}>
        <CardContent>
          <Typography variant="h7" color="white">
            FAN
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
                <Typography className={fanDegree === degree[0] ? 'onCheck' : ''}>
                  OFF
                </Typography>
              </Button>
              <Button onClick={() => degreeChange(1)} variant="subtitle2"
                sx={{ borderRadius: '15px', m: 0.5, p: 0.5, fontWeight: 'bold' }}
              >
                <Typography className={fanDegree === degree[1] ? 'onCheck' : ''}>
                  1단계
                </Typography>
              </Button>
              <Button onClick={() => degreeChange(2)} variant="subtitle2"
                sx={{ borderRadius: '15px', m: 0.5, p: 0.5, fontWeight: 'bold' }}
                >
                <Typography className={fanDegree === degree[2] ? 'onCheck' : ''}>
                  2단계
                </Typography>
              </Button>
              <Button onClick={() => degreeChange(3)} variant="subtitle2"
                sx={{ borderRadius: '15px', m: 0.5, p: 0.5, fontWeight: 'bold' }}
                >
                <Typography className={fanDegree === degree[3] ? 'onCheck' : ''}>
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

export default ControlFan