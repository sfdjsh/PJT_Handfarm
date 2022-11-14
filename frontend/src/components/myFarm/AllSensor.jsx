import React from "react";
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
  const sensorList = [ props.temp, props.co2, props.humid, props.soilHumid, props.dust, props.light ];
  const sensorName = ["Temp", "Co2", "Humid", "SoilHumid", "Dust", "Light"];
  const unit = ["℃", "ppm", "RH", "RH", "㎍/㎥", "lx"]
  const sensorColor = ["feb04d", "FFA26C", "2b97bc", "64B6F8", "835fae", "fd3f01"]

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
                  >
                    {/* <CardContent> */}
                      <Typography sx={{fontWeight:'bold', m:1}}>{sensorName[index]}</Typography>
                      <Typography variant="h6" align="center" 
                      sx={{ mt:1.5, fontWeight:'bold' }}
                      // color="#212528"
                      >
                        {sensor} {sensor !== '- - - -' ? unit[index] : ''}
                      </Typography>
                    {/* </CardContent> */}
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
