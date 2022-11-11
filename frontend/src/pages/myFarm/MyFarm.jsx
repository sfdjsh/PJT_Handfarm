import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import SensorList from "../../components/myFarm/SensorList";
import { Container, Box, Grid, IconButton, Radio } from "@mui/material";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRecoilState } from "recoil";
import { userInfo, userFarm, motorModal, motorControl } from "../../atom";
import ControlDetail from "./ControlDetail"
import ControlTemp from "../../components/control/ControlTemp";
import ControlFan from "../../components/control/ControlFan";
import ControlLed from "../../components/control/ControlLed";
import ControlPump from "../../components/control/ControlPump"
import ControlBuzzer from "../../components/control/ControlBuzzer"

const MyFarm = () => {
  const [user, setUser] = useRecoilState(userInfo);
  const [myFarm, setMyFarm] = useRecoilState(userFarm);
  const [onControl, setOnControl] = useRecoilState(motorModal)
  const [motorState, setMotorState] = useRecoilState(motorControl) 

  const devices = myFarm.deviceInfo
  const [farmRadio, setFarmRadio] = useState('0');
  const [deviceId, setDeviceId] = useState(devices[0].deviceNo || '')
  const email = user.userEmail

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

  // 제어 정보 가져오기
  const controlTemp = motorState.temp
  const controlFan = motorState.fan
  const controlLed = motorState.led
  const controlPump = motorState.pump
  const controlBuzzer = motorState.buzzer

  useEffect(() => {
    motorInfo()
  }, [deviceId])

  return (
    <>
      <Container sx={{ mt: 1, width: "90%" }}>
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
            <IconButton size="large"
            onClick={() => {setOnControl(true)}}
            >
              <SettingsRemoteIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton size="large">
              <SettingsIcon />
            </IconButton>
          </Box>
        </Grid>
        {/* 센서 리스트 */}
        <SensorList deviceId={deviceId} email={email} />

        {/* 제어 모달창 */}
        {/* <ControlDetail deviceId={deviceId} /> */}
        <ControlTemp deviceId={deviceId} controlTemp={controlTemp}/>
        <ControlFan deviceId={deviceId} controlFan={controlFan}/>
        <ControlLed deviceId={deviceId} controlLed={controlLed} />
        <ControlPump deviceId={deviceId} controlPump={controlPump} />
        <ControlBuzzer deviceId={deviceId} controlBuzzer={controlBuzzer} />
        
      </Container>
    </>
  );
};

export default MyFarm;
