import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, ButtonGroup, Button, Switch } from "@mui/material"
import './Control.css'
import { controlState, axiosDegree } from '../../pages/api/Control'

const ControlTemp = ({ controlTemp, deviceId }) => {
  let autoTemp = controlTemp.auto;
  let manualTemp = controlTemp.manual;
  
  const control = "temp"
  const degree = [0, 1, 2]

  const [switchState, setSwitchState] = useState(autoTemp)
  const [tempDegree, setTempDegree] = useState(manualTemp)

  const disabled = true

  useEffect(() => {
    controlState({switchState, control, deviceId})
  }, [switchState])

  function degreeChange(d) {
    setTempDegree(d)
    axiosDegree({d, control, deviceId})
  }

  return (
    <>
      <Card sx={{ mt: 1, height: 120, backgroundColor: "#1E1E1E" }}>
        <CardContent>
          <Typography variant="h7" color="white">
            온도 조절기
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
              display="flex"
            >
              <Button onClick={() => degreeChange(0)} variant="subtitle2"
                sx={{ borderRadius: '15px', m: 0.5, p: 0.5, fontWeight: 'bold' }}
                >
                <Typography className={tempDegree === degree[0] ? 'onCheck' : ''}>
                  Cool
                </Typography>
              </Button>
              <Button onClick={() => degreeChange(1)} variant="subtitle2"
                sx={{ borderRadius: '15px', m: 0.5, p: 0.5, fontWeight: 'bold' }}
                className={tempDegree === degree[1] ? 'onCheck' : 'offCheck'}
              >
                <Typography className={tempDegree === degree[1] ? 'onCheck' : ''}>
                  Off
                </Typography>
              </Button>
              <Button onClick={() => degreeChange(2)} variant="subtitle2"
                sx={{ borderRadius: '15px', m: 0.5, p: 0.5, fontWeight: 'bold' }}
                className={tempDegree === degree[2] ? 'onCheck' : 'offCheck'}>
                <Typography className={tempDegree === degree[2] ? 'onCheck' : ''}>
                  HOT
                </Typography>
              </Button>
            </ButtonGroup>
          </Box>
          <Typography sx={{ mt: 1 }} fontSize={1} color="#FFA629">
            * 온도를 높일 수 있습니다.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ControlTemp;
