import React, { useEffect, useState } from "react";
import { LOCAL_URL } from "../../config";
import axios from "axios";
import handFarmLogo from '../../pictures/handFarmLogo.png'
import styled from "styled-components";

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

const representImg = styled.div`
  background-image: url(${handFarmLogo});
  width: 300px;
  height: 375px;
  margin: 10px;
  border-radius: 10px;
`

const MyPageFarm = () => {

  return (
    <>
      <Box sx={{ background: '#757575', height: 50, mt: 2 }}>
        <Typography sx={{ pt: 1.7, pl: 1.5, fontWeight: "bold", color: "#FFA629" }} position="fixed">토마토</Typography>
        <Typography variant="subtitle1" sx={{ textAlign: 'center', pt: 1.5, fontWeight: "bold" }}>무럭무럭 자라라!</Typography>
      </Box>
      <img src="/HandFarm1.png" alt="대표 이미지" 
      style={{width:'100%', height:'200px'}}/>
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
    </>

    //   <Grid
    //   container
    //   style={{
    //     backgroundColor: "#757575",
    //     display: "flex",
    //     alignItems: "center",
    //   }}
    // >
    //   <Box sx={{ ml:1, textAlign:'center' }}>
    //     <Typography sx={{ color: "#FFA629"}}>작물</Typography>
    //   </Box>
    //   {/* <Box>
    //     <p textAlign="center">농장 이름</p>
    //   </Box> */}
    // </Grid>
  )
}

export default MyPageFarm