import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, ButtonGroup, Button, Switch } from "@mui/material"
import './Control.css'
import { controlState, axiosDegree } from '../../pages/api/Control'

const ControlPump = ({controlPump, deviceId}) => {
  let autoPump = controlPump.auto;
  let manualPump = controlPump.manual;

  const control = "pump"
  const degree = [0, 1]


  const [switchState, setSwitchState] = useState(autoPump)
  const [pumpDegree, setPumpDegree] = useState(manualPump)

  useEffect(() => {
    controlState({switchState, control, deviceId})
  }, [switchState])

  function degreeChange(d) {
    setPumpDegree(d)
    axiosDegree({d, control, deviceId})
  }
  return (
    <>
      <Card sx={{ mt: 1, height: 120, backgroundColor: "#1E1E1E" }}>
        <CardContent>
          <Typography variant="h7" color="white">
            Pump
          </Typography>
          <Box display="flex">
            <Box flexGrow={1} alignItems="center" sx={{ p: 0 }}>
              <Switch defaultChecked color="warning"
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
                <Typography className={pumpDegree === degree[0] ? 'onCheck' : ''}>
                  OFF
                </Typography>
              </Button>
              <Button onClick={() => degreeChange(1)} variant="subtitle2"
                sx={{ borderRadius: '15px', m: 0.5, p: 0.5, fontWeight: 'bold' }}
              >
                <Typography className={pumpDegree === degree[1] ? 'onCheck' : ''}>
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

export default ControlPump