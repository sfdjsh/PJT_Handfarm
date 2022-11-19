import React, {useState} from "react";
import "./Graph.css";
import { useRecoilState } from "recoil";
import { deviceSensor, changeTab } from "../../atom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Container,
  Divider,
} from "@mui/material";
import axios from "axios";
import TodayWeather from "./TodayWeather";
import CameraCard from "./camera/CameraCard";
import { useNavigate } from "react-router-dom";

const AllSensor = (props) => {
  const [value, setValue] = useRecoilState(changeTab)
  const navigate = useNavigate()

  const sensorList = [
    props.pressure,
    props.temp,
    props.humid,
    props.co2,
    props.superDust,
    props.dust,
    props.altitude,
    props.light,
    props.soilHumid,
  ];
  
  const sensorName = [
    "Pressure",
    "Temp",
    "Humid",
    "Co2",
    "pm2.5",
    "pm10",
    "Altitude",
    "Light",
    "SoilHumid",
  ];
  const unit = ["Kpa", "℃", "%", "ppm", "㎍/㎥", "m", "%", "lux"];
  const sensorColor = [
    "2E3138",
    "FFA26C",
    "C387FF",
    "C387FF",
    "FFA26C",
    "feb04d",
    "2E3138",
    "fd3f01",
    "65B6F7",
  ];

  const goTemp = () => {
    navigate('/myfarm/석호')
  }
  const result = sensorList.map((sensor, index) => {
    if (index === 0 || index === 3) {
      return (
        <Grid item xs={4} key={index}>
          <Card
            sx={{
              background: `#${sensorColor[index]}`,
              height: "110px",
            }}
            className={sensor === "- - - -" ? "blur-effect" : ""}
            // onClick={setValue(0)}
          >
            <Box>
              {index === 0 ? (
                <img
                  src="/assets/sensorImg/기압센서.png"
                  alt="..."
                  style={{ width: "20%", margin: "5px" }}
                />
              ) : (
                <></>
              )}
              {index === 3 ? (
                <img
                  src="/assets/sensorImg/이산화탄소센서.png"
                  alt="..."
                  style={{ width: "20%", margin: "5px" }}
                />
              ) : (
                <></>
              )}
              <Typography
                variant="h6"
                align="center"
                sx={{ mt: 0.5, fontWeight: "bold" }}
              >
                {sensor}{" "}
                <span style={{ fontSize: "16px" }}>
                  {sensor !== "- - - -" ? unit[index] : ""}
                </span>
              </Typography>
            </Box>
            <Box sx={{ mt: 1, mr: 1 }}>
              <Typography
                variant="subtitle2"
                align="end"
                sx={{ fontWeight: "bold" }}
                className={index === 0 ? "off-selected" : "text-black"}
              >
                {sensorName[index]}
              </Typography>
            </Box>
          </Card>
        </Grid>
      );
    } else if (index === 1) {
      return (
        <Grid item xs={8} key={index}>
          <Card
            sx={{
              background: `#${sensorColor[index]}`,
              height: "110px",
            }}
            className={sensor === "- - - -" ? "blur-effect" : ""}
            onClick={goTemp}
          >
            <Grid container>
              <Grid item xs={6}>
                <Box>
                  <img
                    src="/assets/sensorImg/온도센서.png"
                    alt="..."
                    style={{ width: "20%", margin: "5px" }}
                  />
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{ mt: 0.5, fontWeight: "bold" }}
                  >
                    {sensor}{" "}
                    <span style={{ fontSize: "16px" }}>
                      {sensor !== "- - - -" ? unit[index] : ""}
                    </span>
                  </Typography>
                </Box>
                <Box sx={{ mt: 1, mr: 1 }}>
                  <Typography
                    variant="subtitle2"
                    align="end"
                    sx={{ fontWeight: "bold" }}
                  >
                    {sensorName[index]}
                  {/* <hr /> */}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <img
                    src="/assets/sensorImg/습도센서.png"
                    alt="..."
                    style={{ width: "20%", margin: "5px" }}
                  />
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{ mt: 0.5, ml: 2, fontWeight: "bold" }}
                  >
                    {sensorList[index + 1]}{" "}
                    <span style={{ fontSize: "16px" }}>
                      {sensor !== "- - - -" ? unit[index + 1] : ""}
                    </span>
                  </Typography>
                  <Box sx={{ mt: 1, mr: 1 }}>
                    <Typography
                      variant="subtitle2"
                      align="end"
                      sx={{ fontWeight: "bold" }}
                    >
                      {sensorName[index + 1]}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      );
    } else if (index === 4) {
      return (
        <Grid item xs={4} key={index}>
          <Card
            sx={{
              background: `#${sensorColor[0]}`,
              width: "28%",
              height: "28%",
              position: "absolute",
            }}
            className={sensor === "- - - -" ? "blur-effect" : ""}
          >
            <Grid container>
              <Grid item xs={12}>
                <img
                  src="/assets/sensorImg/미세먼지센서.png"
                  alt="..."
                  style={{ width: "20%", margin: "5px" }}
                />
                <Typography
                  variant="h6"
                  align="center"
                  color="white"
                  sx={{ fontWeight: "bold", mt: 1 }}
                >
                  {sensor}{" "}
                  <span style={{ fontSize: "16px" }}>
                    {sensor !== "- - - -" ? unit[index] : ""}
                  </span>
                </Typography>
                <Box sx={{ mt: 1, mr: 1 }}>
                  <Typography
                    variant="subtitle2"
                    align="end"
                    sx={{ fontWeight: "bold" }}
                    color="white"
                  >
                    {sensorName[index]}
                  </Typography>
                </Box>
                <hr
                  style={{ marginLeft: "10%", marginTop: "15%", width: "80%" }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 4 }}>
                <Typography
                  variant="h6"
                  align="center"
                  color="white"
                  sx={{ fontWeight: "bold" }}
                >
                  {sensorList[5]}{" "}
                  <span style={{ fontSize: "16px" }}>
                    {sensor !== "- - - -" ? unit[index] : ""}
                  </span>
                </Typography>
                <Box sx={{ mt: 1, mr: 1 }}>
                  <Typography
                    variant="subtitle2"
                    align="end"
                    sx={{ fontWeight: "bold" }}
                    color="white"
                  >
                    {sensorName[index + 1]}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      );
    } else if (index === 6) {
      return (
        <Grid item xs={4} key={index}>
          <Card
            sx={{
              background: `#${sensorColor[index]}`,
              height: "110px",
            }}
            className={sensor === "- - - -" ? "blur-effect" : ""}
          >
            <img
              src="/assets/sensorImg/고도센서.png"
              alt="..."
              style={{ width: "20%", margin: "5px" }}
            />
            <Box>
              <Typography
                variant="h6"
                align="center"
                sx={{ mt: 0.5, fontWeight: "bold", color: "white" }}
              >
                {sensor} {sensor !== "- - - -" ? unit[index] : ""}
              </Typography>
            </Box>
            <Box sx={{ mt: 1, mr: 1 }}>
              <Typography
                variant="subtitle2"
                align="end"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                {sensorName[index]}
              </Typography>
            </Box>
          </Card>
        </Grid>
      );
    } else if (index === 7) {
      return (
        <>
          <Grid item xs={4} key={index}>
            <Card
              sx={{
                background: "#2E3138",
                height: "110px",
              }}
              className={sensor === "- - - -" ? "blur-effect" : ""}
            >
              <img
                src="/assets/sensorImg/조도센서.png"
                alt="..."
                style={{ width: "20%", margin: "5px" }}
              />
              <Box>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ mt: 0.5, fontWeight: "bold", color: "white" }}
                >
                  {sensor} {sensor !== "- - - -" ? unit[index] : ""}
                </Typography>
              </Box>
              <Box sx={{ mt: 1, mr: 1 }}>
                <Typography
                  variant="subtitle2"
                  align="end"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  {sensorName[index]}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </>
      );
    } else if (index === 8) {
      return (
        <>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} key={index}>
            <Card
              sx={{
                background: `#${sensorColor[index]}`,
                height: "110px",
              }}
              className={sensor === "- - - -" ? "blur-effect" : ""}
            >
              <img
                src="/assets/sensorImg/토양습도센서.png"
                alt="..."
                style={{ width: "20%", margin: "5px" }}
              />
              <Box>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ mt: 0.5, ml:1, fontWeight: "bold" }}
                >
                  {sensor}{" "}
                  <span style={{ fontSize: "16px" }}>
                    {sensor !== "- - - -" ? unit[2] : ""}
                  </span>
                </Typography>
              </Box>
              <Box sx={{ mt: 1, mr: 1 }}>
                <Typography
                  variant="subtitle2"
                  align="end"
                  sx={{ fontWeight: "bold" }}
                >
                  {sensorName[index]}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </>
      );
    }
  });

  return (
    <>
      {value === 0 ? (
        <Container>
          <Typography sx={{mt:2, fontWeight:'bold'}} variant="h5">Connected Sensor</Typography>
          <Grid container spacing={2} sx={{ mt:0.1 }}>
            {result}
          </Grid>
          <TodayWeather deviceId={props.deviceId} />
          <CameraCard deviceId={props.deviceId} camera={props.camera} />
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default AllSensor;
