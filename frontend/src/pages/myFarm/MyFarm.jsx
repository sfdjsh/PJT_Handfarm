import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import SensorList from "../../components/myFarm/SensorList";
import { Container, Box, Grid, IconButton, Radio } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRecoilState } from "recoil";
import { userInfo, userFarm, motorControl, locations } from "../../atom";

const MyFarm = () => {
  const [user, setUser] = useRecoilState(userInfo);
  const [myFarm, setMyFarm] = useRecoilState(userFarm);
  const [motorState, setMotorState] = useRecoilState(motorControl) 
  const [location, setLocation] = useRecoilState(locations)

  const devices = myFarm.deviceInfo
  const [farmRadio, setFarmRadio] = useState('0');
  const [deviceId, setDeviceId] = useState(devices[0].deviceNo)
  const email = user.userEmail
  const camera = devices[farmRadio].deviceCamera

  const motorInfo = async () => {
    const URL = `${BASE_URL}/farm/${deviceId}/manual`
    const result = await axios.get(URL, {
      headers: {
        accessToken : localStorage.getItem('access_token')
      }
    })
    console.log(result.data)
    setMotorState(result.data)
  }

  useEffect(() => {
    motorInfo()
  }, [deviceId])

  useEffect(() => {
    setLocation([devices[farmRadio].deviceLatitude, devices[farmRadio].deviceLong])
  }, [])

  return (
    <>
      <Container sx={{ mt: 1 }}>
        <div>
          {devices.map((d, index) => (
            <Radio
              key={d.deviceNo}
              checked={farmRadio === `${index}`}
              value={index}
              onChange={(e) => {
                const deviceNo = d.deviceNo
                setFarmRadio(e.target.value)
                setDeviceId(deviceNo)
              }}
              name="radio-buttons"
            />
          ))}
        </div>
        <Grid
          container
          style={{
            backgroundColor: "#757575",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ ml: 1 }} flexGrow={1}>
            <p style={{ color: "#FFA629" }}>{devices[farmRadio].cropName}</p>
          </Box>
          <Box flexGrow={1}>
            <p>{devices[farmRadio].deviceName}</p>
          </Box>
          <Box>
            <IconButton size="large">
              <SettingsIcon />
            </IconButton>
          </Box>
        </Grid>
      </Container>

      {/* 센서 리스트 */}
      <SensorList deviceId={deviceId} email={email} camera={camera} />     
    </>
  );
};

export default MyFarm;
