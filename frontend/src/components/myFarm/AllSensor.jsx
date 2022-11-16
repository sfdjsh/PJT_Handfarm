import React from "react";
import './Graph.css'
import { useRecoilState } from "recoil";
import { deviceSensor } from "../../atom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Container,
} from "@mui/material";
import axios from 'axios'

const AllSensor = (props) => {
  // const sensorList = [ props.temp, props.co2, props.humid, props.soilHumid, props.dust, props.superDust, props.light ];
  const sensorList = [props.pressure, props.temp, props.humid, props.co2, props.dust, props.superDust, props.light, props.soilHumid, props.altitude];
  const sensorName = ["Pressure", "Temp", "Humid", "Co2", "Dust", "Altitude", "SoilHumid", "Altra Dust", "Light"];
  const unit = ["Kpa", "℃", "RH", "ppm", "RH", "㎍/㎥", "m", "㎍/㎥", "lx"]
  const sensorColor = ["2E3138", "2b97bc", "64B6F8", "FFA26C", "feb04d", "2E3138", "fd3f01"]
  // altitude(m)
  // const testgogo = () => {
  //   URL = 'https://5c8d-121-147-32-194.jp.ngrok.io/stream'
  //   axios.get(URL, {
  //     headers: {
  //       "ngrok-skip-browser-warning" : "69420"
  //     }
  //   })
  //     .then(response => {
  //       console.log(response.data)
  //     })
  // }
  // 2E3138
  // item xs = 4 인거 : 기압, C02, 고도, cds, 토양습도
  // item xs = 8 인거 : temp, 습도
  // height 두배 : pm2.5, pm10

  const result = sensorList.map((sensor, index) => {
    if (index === 0 || index === 2 || index === 5 ) {
      return (
        <Grid item xs={4} key={index} >
          <Card sx={{
            background: `#${sensorColor[index]}`,
            height: "110px",
          }}
          // className={sensor === '- - - -'? 'blurEffect' : ''}
          >
            <Box>
              <Typography sx={{ fontWeight: 'bold', m: 1 }}>
                {sensorName[index]}
              </Typography>
              <Typography variant="h6" align="center"
                sx={{ mt: 1.5, fontWeight: 'bold' }}
              >
                {sensor} {sensor !== '- - - -' ? unit[index] : ''}
              </Typography>
            </Box>
          </Card>
        </Grid>
      )
    } else if (index === 1) {
      return (
        <Grid item xs={8} key={index}>
          <Card sx={{
            background: `#${sensorColor[index]}`,
            height: "110px",
          }}
          // className={sensor === '- - - -'? 'blurEffect' : ''}
          >
            <Box>
              <Typography sx={{ fontWeight: 'bold', m: 1 }}>
                {sensorName[index]}
              </Typography>
              <Typography variant="h6" align="center"
                sx={{ mt: 1.5, fontWeight: 'bold' }}
              >
                {sensor} {sensor !== '- - - -' ? unit[index] : ''}
              </Typography>
            </Box>
          </Card>
        </Grid>
      )
    } else if (index === 4) {
      return (
        <Grid item xs={4} key={index}>
          <Card sx={{
            background: `#${sensorColor[index]}`,
            width:'110px', height: "236px",
            position: 'absolute'
          }}
          // className={sensor === '- - - -'? 'blurEffect' : ''}
          >
            <Box>
              <Typography sx={{ fontWeight: 'bold', m: 1 }}>
                {sensorName[index]}
              </Typography>
              <Typography variant="h6" align="center"
                sx={{ mt: 1.5, fontWeight: 'bold' }}
              >
                {sensor} {sensor !== '- - - -' ? unit[index] : ''}
              </Typography>
            </Box>
          </Card>
        </Grid>
      )
    } else if (index === 6) {
      return (
        <Grid item xs={4} key={index} >
          <Card sx={{
            background: `#${sensorColor[index]}`,
            height: "110px",
          }}
          // className={sensor === '- - - -'? 'blurEffect' : ''}
          >
            <Box>
              <Typography sx={{ fontWeight: 'bold', m: 1 }}>
                {sensorName[index]}
              </Typography>
              <Typography variant="h6" align="center"
                sx={{ mt: 1.5, fontWeight: 'bold' }}
              >
                {sensor} {sensor !== '- - - -' ? unit[index] : ''}
              </Typography>
            </Box>
          </Card>
        </Grid>
      )
    } else if (index === 7) {
      return (
        <>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} key={index} >
          <Card sx={{
            background: `#${sensorColor[index]}`,
            height: "110px",
          }}
          // className={sensor === '- - - -'? 'blurEffect' : ''}
          >
            <Box>
              <Typography sx={{ fontWeight: 'bold', m: 1 }}>
                {sensorName[index]}
              </Typography>
              <Typography variant="h6" align="center"
                sx={{ mt: 1.5, fontWeight: 'bold' }}
              >
                {sensor} {sensor !== '- - - -' ? unit[index] : ''}
              </Typography>
            </Box>
          </Card>
        </Grid>
        </>
      )
    }
  })
  
  return (
    <>
      {props.value === 0 ?
        <Container>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {result}
          </Grid>
        </Container> : <></>}
    </>
  )
}

export default AllSensor;
