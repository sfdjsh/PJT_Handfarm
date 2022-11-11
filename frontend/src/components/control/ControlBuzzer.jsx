import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, ButtonGroup, Button, Switch } from "@mui/material"
import './Control.css'
import { controlState, axiosDegree } from '../../pages/api/Control'

const ControlBuzzer = ({controlBuzzer, deviceId}) => {
  let autoBuzzer = controlBuzzer.auto;
  let manualBuzzer = controlBuzzer.manual;

  const control = "buzzer"
  const degree = [0, 1]


  const [switchState, setSwitchState] = useState(autoBuzzer)
  const [buzzerDegree, setBuzzerDegree] = useState(manualBuzzer)

  useEffect(() => {
    controlState({switchState, control, deviceId})
  }, [switchState])

  function degreeChange(d) {
    setBuzzerDegree(d)
    axiosDegree({d, control, deviceId})
  }
  return (
    <>
      <Card sx={{ mt: 1, height: 120, backgroundColor: "#1E1E1E" }}>
        <CardContent>
          <Typography variant="h7" color="white">
            경보기
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
                <Typography className={buzzerDegree === degree[0] ? 'onCheck' : ''}>
                  OFF
                </Typography>
              </Button>
              <Button onClick={() => degreeChange(1)} variant="subtitle2"
                sx={{ borderRadius: '15px', m: 0.5, p: 0.5, fontWeight: 'bold' }}
              >
                <Typography className={buzzerDegree === degree[1] ? 'onCheck' : ''}>
                  ON
                </Typography>
              </Button>
            </ButtonGroup>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default ControlBuzzer