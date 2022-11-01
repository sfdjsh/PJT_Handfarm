import axios from "axios";
import React, { useEffect } from "react";
import Alarm from "../api/Alarm";
import { LOCAL_URL } from "../../config";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import {
  Container,
  Box,
  Grid,
  IconButton,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { textAlign } from "@mui/system";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import SettingsIcon from "@mui/icons-material/Settings";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import CircleIcon from "@mui/icons-material/Circle";

const MyFarm = () => {
  const URL = `${LOCAL_URL}/notice/count`;
  const accessToken = localStorage.getItem("access_token");

  // useEffect(() => {
  //   axios(URL, {
  //     method: "GET",
  //     headers : {
  //       'Authorization' : accessToken
  //     }
  //   })
  //     .then(response => {console.log(response)})
  // }, [])

  return (
    <>
      <Header />
      <Container sx={{ mt: 1, width: "90%" }}>
        {/* 농장 이름 */}
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

        {/* 센서 정보 */}
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

        {/* GPS */}
        <Grid item xs={12} sx={{ mt: 1 }}>
          <Card sx={{ height: 100 }}>
            <p>GPS 영역</p>
          </Card>
        </Grid>

        {/* Camera */}
        <Grid item xs={12} sx={{ mt: 1 }}>
          <Card sx={{ height: 150 }}>
            <p>카메라 영역</p>
          </Card>
          <Button sx={{ background: "#222222", p: 1.5 }} variant="contained">
            <CircleIcon sx={{ mr: 1, color: "#D80000" }} /> 대표 사진 등록
          </Button>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default MyFarm;
