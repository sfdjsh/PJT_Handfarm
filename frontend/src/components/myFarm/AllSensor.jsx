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

const AllSensor = (props) => {
  // const sensorList = [ props.temp, props.co2, props.humid, props.soilHumid, props.dust, props.superDust, props.light ];
  const sensorList = [ props.temp, props.humid, props.soilHumid, props.co2, props.dust, props.superDust, props.light ];
  const sensorName = ["Temp", "Humid", "SoilHumid", "Co2", "Dust", "Altra Dust", "Light"];
  const unit = ["℃", "RH", "RH", "ppm", "㎍/㎥", "㎍/㎥", "lx"]
  const sensorColor = ["2E3138", "2b97bc", "64B6F8", "FFA26C", "feb04d", "2E3138", "fd3f01"]

  // 2E3138
  return (  
    <>
      {props.value === 0 ? (
        <>
          <Container>
            <Grid container spacing={1} sx={{ mt: 2 }}>
              {sensorList.map((sensor, index) => (
                <Grid item xs={4} key={index}>
                  <Card
                    sx={{
                      background: `#${sensorColor[index]}`,
                      boxShadow: "0 0 5px",
                      width:'110px', height: "110px",
                    }}
                    className={sensor === '- - - -'? 'blurEffect' : ''}
                    onClick={() => {console.log('하이?')}}
                  >   
                    <Box>
                      <Typography sx={{fontWeight:'bold', m:1}}>{sensorName[index]}</Typography>
                      <Typography variant="h6" align="center" 
                      sx={{ mt:1.5, fontWeight:'bold' }}
                      >
                        {sensor} {sensor !== '- - - -' ? unit[index] : ''}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AllSensor;
