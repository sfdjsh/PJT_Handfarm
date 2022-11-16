import React, { useState, useEffect } from "react";
// import Iframe from 'react-iframe'
import { useRecoilState } from "recoil";
import { deviceSensor } from "../../atom";
import { BASE_URL } from "../../config";
import { EventSourcePolyfill } from "event-source-polyfill";
import { Grid } from "@mui/material";

import AllSensor from "./AllSensor";
import TempCard from "./temp/TempCard";
import Co2Card from "./co2/Co2Card";
import HumidCard from "./humid/HumidCard";
import SoilHumidCard from "./soilHumid/SoilHumidCard";
import LedCard from "./led/LedCard";

import { Box, Tabs, Tab, Container } from "@mui/material";
import CameraCard from "./camera/CameraCard";

const SensorList = ({ deviceId, email, camera }) => {
  const [sensor, setSensor] = useRecoilState(deviceSensor);

  const test = () => {
    const sse = new EventSourcePolyfill(`${BASE_URL}/connect/${email}`);
    sse.addEventListener("connect", (e) => {
      const { data: receivedConnectData } = e;
      console.log(receivedConnectData)
      setSensor(JSON.parse(receivedConnectData));
    });
  };

  useEffect(() => {
    test();
  }, []);

  const temp = sensor[deviceId].temp ? sensor[deviceId].temp : '- - - -';
  const co2 = sensor[deviceId].co2 ? sensor[deviceId].co2 : '- - - -';
  const humid = sensor[deviceId].humid ? sensor[deviceId].humid : '- - - -';
  const soilHumid = sensor[deviceId].humidSoil ? sensor[deviceId].humidSoil : '- - - -';
  const superDust = sensor[deviceId].pm2p5 ? sensor[deviceId].pm2p5 : "- - - -"
  const dust = sensor[deviceId].pm10 ? sensor[deviceId].pm10 : '- - - -'
  const light = sensor[deviceId].cds ? sensor[deviceId].cds : '- - - -'
  const altitude = sensor[deviceId].altitude ? sensor[deviceId].altitude  : '- - - -'
  const pressure = sensor[deviceId].pressure ? sensor[deviceId].preessure : '- - - -'

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <>
      <Container>
        <Box sx={{ background: "#757575", pt: 1, color: "white" }}>
          <Box display="flex">
            {/* 전체 tab default */}
            {/* <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="visible arrows tabs example"
                textColor="inherit"
              >
                <Tab label="전체" value={0} ></Tab>
              </Tabs>
            </Box> */}
            {/* 센서 리스트 */}
            <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            aria-label="visible arrows tabs example"
            textColor="inherit">
              <Tab label="전체" value={0} ></Tab>
              {temp !== '- - - -' ? <Tab label="온도" value={1} /> : null}
              {co2 !== '- - - -' ? <Tab label="이산화탄소" value={2} /> : null}
              {humid !== '- - - -' ? <Tab label="습도" value={3} /> : null}
              {soilHumid !== '- - - -' ? <Tab label="토양습도" value={4} /> : null} 
              <Tab label="Led" value={5} />
              <Tab label="camera" value={6} />
            </Tabs>
          </Box>
        </Box>
      </Container>
      <Grid sx={{ mt: 1 }}>
        {sensor[deviceId] ? (
          <>
            <AllSensor deviceId={deviceId} value={value} 
            temp={temp} co2={co2} humid={humid} soilHumid={soilHumid} 
            dust={dust} superDust={superDust} light={light} 
            pressure={pressure} altitude={altitude} />
            <TempCard temp={temp} deviceId={deviceId} value={value} />
            <Co2Card co2={co2} deviceId={deviceId} value={value} />
            <HumidCard humid={humid} deviceId={deviceId} value={value} />
            <SoilHumidCard soilHumid={soilHumid} deviceId={deviceId} value={value}/>
            <LedCard deviceId={deviceId} value={value} />
            <CameraCard camera={camera} deviceId={deviceId} value={value} />
          </>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
};

export default SensorList;
