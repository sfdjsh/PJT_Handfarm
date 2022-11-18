import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import SensorList from "../../components/myFarm/SensorList";
import { Container, Box, Grid, IconButton, Radio } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRecoilState } from "recoil";
import { userInfo, userFarm, motorControl, locations } from "../../atom";

const MyFarm = () => {
  // const [user, setUser] = useRecoilState(userInfo);
  // const [myFarm, setMyFarm] = useRecoilState(userFarm);
  // const [motorState, setMotorState] = useRecoilState(motorControl)
  // const [location, setLocation] = useRecoilState(locations)

  // const devices = myFarm.deviceInfo
  // const [farmRadio, setFarmRadio] = useState('');
  // const [deviceId, setDeviceId] = useState(devices[0].deviceNo)
  // const email = user.userEmail
  // const camera = devices[farmRadio].deviceCamera

  // const motorInfo = async () => {
  //   const URL = `${BASE_URL}/farm/${deviceId}/manual`
  //   const result = await axios.get(URL, {
  //     headers: {
  //       accessToken: localStorage.getItem('access_token')
  //     }
  //   })
  //   setMotorState(result.data)
  // }

  // useEffect(() => {
  //   motorInfo()
  // }, [deviceId])

  // useEffect(() => {
  //   setLocation([devices[farmRadio].deviceLatitude, devices[farmRadio].deviceLong])
  // }, [])

  const test = [
    {'D30' : { "deviceLatitude": 35.2058, "cropName": "딸기", "deviceCamera": "https://5c8d-121-147-32-194.jp.ngrok.io/stream", "deviceName": "지니 농장", "deviceLong": 126}}, 
    {'D33' : { "deviceLatitude": 35.2058, "cropName": "딸기", "deviceCamera": "https://5c8d-121-147-32-194.jp.ngrok.io/stream", "deviceName": "지니 농장", "deviceLong": 126}}
  ]

  const test1 = test.map((farm) => {
    console.log(farm.D30)
    return (
      <>
        <div>ㅋㅋㅋ</div>
      </>
    )
  })

  return (
    <>
      {test1}
    </>
  );
};

export default MyFarm;



// {
//   "message": "success",
//   "deviceInfo": [
//     {'D30' : { "deviceLatitude": 35.2058, "cropName": "딸기", "deviceCamera": "https://5c8d-121-147-32-194.jp.ngrok.io/stream", "deviceName": "지니 농장", "deviceLong": 126}}, 
//     {'D33' : { "deviceLatitude": 35.2058, "cropName": "딸기", "deviceCamera": "https://5c8d-121-147-32-194.jp.ngrok.io/stream", "deviceName": "지니 농장", "deviceLong": 126}}
//   ]
// }