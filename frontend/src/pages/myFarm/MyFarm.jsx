import React, { useEffect } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import { Container, Box, Grid, IconButton, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import SettingsIcon from "@mui/icons-material/Settings";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { useRecoilState } from "recoil";
import { userInfo, userFarm } from "../../atom"
import MyFarmList from "../../components/myFarm/MyFarmList";

const MyFarm = () => {
  const [deviceID, setDeviceID] = useRecoilState(userInfo)
  const [myFarm, setMyFarm] = useRecoilState(userFarm)
  const devices = deviceID.deviceId
  const lengthzzz = 2
  useEffect(() => {
    devices.map((device) => {
      const deviceNo = device.deviceNo
      axios({
        url: `${BASE_URL}/farm/${deviceNo}`,
        method: "GET",
        headers : {
          accessToken : localStorage.getItem("access_token")
        }
      })
      .then(response => {
        setMyFarm(response.data)
      })
    })
  }, [])

  return (
    <>
      <Container sx={{ mt: 1, width: "90%" }}>
        {lengthzzz.map((idx) => (
          <p>{idx}</p>
        ))}
        <MyFarmList devices={devices}/>        
        {/* <Grid
          container
          style={{
            backgroundColor: "#757575",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ ml: 1 }} flexGrow={1}>
            <p style={{ color: "#FFA629" }}>작물</p>
          </Box>
          <Box flexGrow={1}>
            <p>농장 이름</p>
          </Box>
          <Box>
            <IconButton size="large">
              <SettingsRemoteIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton size="large">
              <SettingsIcon />
            </IconButton>
          </Box>
        </Grid>

        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Card sx={{ background: "#F7B634" }}>
              <CardContent>
                <DeviceThermostatOutlinedIcon />
                <Typography textAlign="center" variant="h5" sx={{ mt: 1 }}>
                  <span style={{ fontWeight: "bold" }}>24.8C</span>
                </Typography>
              </CardContent>
              <CardActions sx={{ ml: 1 }}>
                <span style={{ fontWeight: "bold" }}>Temp</span>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ background: "#9747FF" }}>
              <CardContent>
                <DeviceThermostatOutlinedIcon />
                <Typography textAlign="center" variant="h5" sx={{ mt: 1 }}>
                  <span style={{ fontWeight: "bold" }}>24.8C</span>
                </Typography>
              </CardContent>
              <CardActions sx={{ ml: 1 }}>
                <span style={{ fontWeight: "bold" }}>Temp</span>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ mt: 1 }}>
          <Card sx={{ height: 100 }}>
            <p>GPS 영역</p>
          </Card>
        </Grid>

        <Grid item xs={12} sx={{ mt: 1 }}>
          <Card sx={{ height: 150 }}>
            <p>카메라 영역</p>
          </Card>
          <Button sx={{ background: "#222222", p: 1.5 }} variant="contained">
            <CircleIcon sx={{ mr: 1, color: "#D80000" }} /> 대표 사진 등록
          </Button>
        </Grid> */}
      </Container>
    </>
  );
};

export default MyFarm;
