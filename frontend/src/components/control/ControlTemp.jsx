import React, {useState, useEffect} from "react";
import { Card, CardContent, Typography, Box, ButtonGroup, Button, Switch } from "@mui/material"
import './ControlTemp.css'
import {tempState, axiosTempDegree} from '../../pages/api/Control'

const ControlTemp = ({ controlTemp }) => {
  let autoTemp = controlTemp.auto;
  let manualTemp = controlTemp.manual;
  
  const [tempSwitch, setTempSwitch] = useState(false)
  const [tempDegree, setTempDegree] = useState(0)
  const degree = [0, 1, 2]

  useEffect(() => {
    if (autoTemp === 1) {
      setTempSwitch(true)
    } else {
      setTempSwitch(false)
    }
  }, [])

  function degreeChange(d) {
    setTempDegree(d)
    axiosTempDegree(d)
  }

  // function onDegree() {
    // const result = []
    // const degree = ['OFF', 'COOL', 'HOT']
    // for (let i=0; i < degree.length; i++) {
    //   const test = tempDegree
    //   result.push(
    //     <Button 
    //     className={i === test? 'on-check' : 'off-check'} 
    //     onClick={() => {degreeChange(i)}} variant="subtitle2" 
    //     sx={{borderRadius: '15px', m:0.5, p:0.5, fontWeight:'bold'}}
    //     >{degree[i]}</Button>
    //   )
    // }
    // return result
    console.log(tempDegree)
    // if (tempDegree === 0) {
    //   return (
    //     <>
    //       <Button onClick={() => {degreeChange(0)}} variant="subtitle2" 
    //       sx={{borderRadius: '15px', m:0.5, p:0.5, fontWeight:'bold', background:'#FFA629'}}
    //       >OFF</Button>
    //       <Button sx={{borderRadius: '15px', m:0.5, p:0.5, fontWeight:'bold'}} variant="subtitle2"
    //       onClick={() => {degreeChange(1)}}>Cool</Button>
    //       <Button sx={{borderRadius: '15px', m:0.5, p:0.5, fontWeight:'bold'}}
    //       onClick={() => {degreeChange(2)}}>Hot</Button>
    //     </>
    //   )
    // } else if (tempDegree === 1) {
    //   return (
    //     <>
    //       <Button sx={{borderRadius: '15px', m:0.5, p:0.5, fontWeight:'bold'}}
    //       onClick={() => {degreeChange(0)}} variant="subtitle2">
    //         OFF
    //       </Button>
    //       <Button onClick={() => {degreeChange(1)}} variant="subtitle2" 
    //       sx={{borderRadius: '15px', m:0.5, p:0.5, fontWeight:'bold', background:'#FFA629'}}>
    //         COOL
    //       </Button>
    //       <Button onClick={() => {degreeChange(2)}} variant="subtitle2"
    //       sx={{borderRadius: '15px', m:0.5, p:0.5, fontWeight:'bold'}}>
    //         Hot
    //       </Button>
    //     </>
    //   ) 
    // } else if (tempDegree === 2) {
    //   return (
    //     <>
    //       <Button onClick={() => {degreeChange(0)}} variant="subtitle2" 
    //       sx={{borderRadius: '15px', m:0.5, p:0.5, fontWeight:'bold'}}>
    //         OFF
    //       </Button>
    //       <Button onClick={() => {degreeChange(1)}} variant="subtitle2" 
    //       sx={{borderRadius: '15px', m:0.5, p:0.5, fontWeight:'bold'}}>
    //         Cool
    //       </Button>
    //       <Button onClick={() => {degreeChange(2)}} variant="subtitle2" 
    //       sx={{borderRadius: '15px', m:0.5, p:0.5, fontWeight:'bold', background:'#FFA629'}}>
    //         HOT
    //       </Button>
    //     </>
    //   ) 
    // }
  // }

  return (
    <>
      <Card sx={{ mt: 1, height: 120, backgroundColor: "#1E1E1E" }}>
        <CardContent>
          <Typography variant="h7" color="white">
            온풍기
          </Typography>
          <Box display="flex">
            <Box flexGrow={1} alignItems="center" sx={{p:0}}>
              <Switch defaultChecked color="warning" 
              checked={tempSwitch}
              onChange={(event) => setTempSwitch(event.target.checked)}
              />
              {
              tempSwitch===true? 
              <span style={{ color: "white", fontSize: "12px" }}>자동</span> :
              <span style={{ color: "white", fontSize: "12px" }}>수동</span>
              }
            </Box>
            <ButtonGroup
              sx={{background:'white', borderRadius: '20px'}}
              display="flex"
            >
              <Button onClick={() => degreeChange(0)} variant="subtitle2"
              sx={{borderRadius: '15px', m:0.5, p:0.5, fontWeight:'bold'}}
              className={tempDegree === degree[0]? 'on-check' : 'off-check'}>
                OFF
              </Button>
              <Button onClick={() => degreeChange(1)} variant="subtitle2"
              sx={{borderRadius: '15px', m:0.5, p:0.5, fontWeight:'bold'}}
              className={tempDegree === degree[1]? 'on-check' : 'off-check'}
              >Cool
              </Button>
              <Button onClick={() => degreeChange(2)} variant="subtitle2"
              sx={{borderRadius: '15px', m:0.5, p:0.5, fontWeight:'bold'}}
              className={tempDegree === degree[2]? 'on-check' : 'off-check'}>
                Hot
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
