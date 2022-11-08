import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { deviceSensor } from "../../atom";
import { BASE_URL } from "../../config";
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { Grid } from '@mui/material' 

import TempCard from "./TempCard";
import Co2Card from "./Co2Card"
import HumidCard from "./HumidCard"
import SoilHumidCard from "./SoilHumidCard"

const SensorList = ({ deviceId, email }) => {
  const [sensor, setSensor] = useRecoilState(deviceSensor)

  const test = () => {
    const sse = new EventSourcePolyfill(`${BASE_URL}/connect/${email}`)
    sse.addEventListener('connect', (e) => {
      const {data: receivedConnectData} = e;
      setSensor(JSON.parse(receivedConnectData))
    })
  };

  useEffect(() => {
    test();
  }, [])

  const temp = sensor[deviceId].temp
  const co2 = sensor[deviceId].CO2
  const humid = sensor[deviceId].humid
  const soilHumid = sensor[deviceId].soilHumid
  return (
    <>
      <Grid container spacing={1} sx={{ mt: 1 }}>
          <TempCard temp={temp} />
          <HumidCard humid={humid} />
          <Co2Card co2={co2} />
          <SoilHumidCard soilHumid={soilHumid}/>
      </Grid>
    </>
  )
};

export default SensorList;
