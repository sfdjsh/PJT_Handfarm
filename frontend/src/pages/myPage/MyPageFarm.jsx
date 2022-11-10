import React, { useEffect, useState } from "react";
import handFarmLogo from '../../pictures/handFarmLogo.png'
import styled from "styled-components";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";

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
      <Box sx={{boxShadow: "0 0 5px", background: '#757575', height: 50, mt: 2 }}>
        <Typography sx={{ pt: 1.7, pl: 1.5, fontWeight: "bold", color: "#FFA629", fontFamily : "ScoreDream" }} position="fixed">토마토</Typography>
        <Typography variant="subtitle1" sx={{ textAlign: 'center', pt: 1.5, fontWeight: "bold",fontFamily : "ScoreDream" }}>무럭무럭 자라라!</Typography>
      </Box>
      {/*<img src="/HandFarm1.png" alt="대표 이미지" */}
      {/*style={{width:'100%', height:'200px'}}/>*/}
      <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Card sx={{ background: "#F7B634", boxShadow: "0 0 5px" }}>
              <CardContent>
                <DeviceThermostatOutlinedIcon />
                <Typography textAlign="center" variant="h5" sx={{ mt: 1, fontFamily : "ScoreDream" }}>
                  <span style={{ fontWeight: "bold" }}>24.8C</span>
                </Typography>
              </CardContent>
              <CardActions sx={{ ml: 1 }}>
                <span style={{ fontWeight: "bold", fontFamily : "ScoreDream" }}>Temp</span>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ background: "#9747FF", boxShadow: "0 0 5px" }}>
              <CardContent>
                <DeviceThermostatOutlinedIcon />
                <Typography textAlign="center" variant="h5" sx={{ mt: 1,fontFamily : "ScoreDream" }}>
                  <span style={{ fontWeight: "bold", fontFamily : "ScoreDream" }}>24.8C</span>
                </Typography>
              </CardContent>
              <CardActions sx={{ ml: 1 }}>
                <span style={{ fontWeight: "bold", fontFamily : "ScoreDream" }}>Temp</span>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
    </>
  )
}

export default MyPageFarm