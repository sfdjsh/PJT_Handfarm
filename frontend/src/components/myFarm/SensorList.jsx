import React, { useState, useEffect } from "react";
// import Iframe from 'react-iframe'
import { useRecoilState } from "recoil";
import { deviceSensor } from "../../atom";
import { BASE_URL } from "../../config";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { Grid } from "@mui/material";

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

  const temp = sensor[deviceId] ? sensor[deviceId].temp : "";
  const co2 = sensor[deviceId] ? sensor[deviceId].CO2 : "";
  const humid = sensor[deviceId] ? sensor[deviceId].humid : "";
  const soilHumid = sensor[deviceId] ? sensor[deviceId].soilHumid : "";

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
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
          >
            {temp ? <Tab label="온도"></Tab> : <></>}
            {co2 ? <Tab label="이산화탄소"></Tab> : <></>}
            {humid ? <Tab label="습도"></Tab> : <></>}
            {soilHumid ? <Tab label="토양습도"></Tab> : <></>}
            <Tab label="Led"></Tab>
            {camera ? <Tab label="카메라"></Tab> : <></>}
          </Tabs>
        </Box>
      </Container>
      <Grid sx={{ mt: 1 }}>
        {sensor ? (
          <>
            <TempCard temp={temp} deviceId={deviceId} value={value} />
            <Co2Card co2={co2} deviceId={deviceId} value={value} />
            <HumidCard humid={humid} deviceId={deviceId} value={value} />
            <SoilHumidCard soilHumid={soilHumid} deviceId={deviceId} value={value}/>
            <CameraCard camera={camera} deviceId={deviceId} value={value} />
            <LedCard deviceId={deviceId} value={value} />
          </>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
};

export default SensorList;
