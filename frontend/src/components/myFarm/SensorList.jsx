import React, { useState, useEffect } from "react";
// import Iframe from 'react-iframe'
import { useRecoilState } from "recoil";
import { deviceSensor } from "../../atom";
import { BASE_URL } from "../../config";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { Grid } from "@mui/material";

import AllSensor from "./AllSensor";
import TempCard from "./temp/TempCard";
import Co2Card from "./co2/Co2Card";
import HumidCard from "./humid/HumidCard";
import SoilHumidCard from "./soilHumid/SoilHumidCard";
import LedCard from "./led/LedCard";

import { Box, Tabs, Tab, Container, tabsClasses } from "@mui/material";
import CameraCard from "./camera/CameraCard";

const SensorList = ({ deviceId, email, camera }) => {
  const [sensor, setSensor] = useRecoilState(deviceSensor);

  const test = () => {
    const sse = new EventSourcePolyfill(`${BASE_URL}/connect/${email}`);
    sse.addEventListener("connect", (e) => {
      const { data: receivedConnectData } = e;
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
  // const superDust = sensor[deviceId] ? sensor[deviceId].pm2.5 : ""
  const dust = sensor[deviceId].pm10 ? sensor[deviceId].pm10 : '- - - -'
  const light = sensor[deviceId].cds ? sensor[deviceId].cds : '- - - -'

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <>
      <Container>
        <Box sx={{ background: "#757575", pt: 1, color: "white" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            aria-label="visible arrows tabs example"
            textColor="inherit"
            // sx={{
            //   [`& .${tabsClasses.scrollButtons}`]: {
            //     "&.Mui-disabled": { opacity: 0.3 },
            //   },
            // }}
          >
            <Tab label="전체" value={0}></Tab>
            {temp !== '- - - -' ? <Tab label="온도" value={1} /> : <></>}
            {co2 !== '- - - -' ? <Tab label="이산화탄소" value={2} /> : <></>}
            {humid !== '- - - -' ? <Tab label="습도" value={3} /> : <></>}
            {soilHumid !== '- - - -' ? <Tab label="토양습도" value={4} /> : <></>} 
            <Tab label="Led" value={5} />
            {/* {camera !== null ? <Tab label="카메라" value={6} /> : <></>} */}
          </Tabs>
        </Box>
      </Container>
      <Grid sx={{ mt: 1 }}>
        {sensor[deviceId] ? (
          <>
            <AllSensor deviceId={deviceId} value={value} 
            temp={temp} co2={co2} humid={humid} soilHumid={soilHumid} dust={dust} light={light} />
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
