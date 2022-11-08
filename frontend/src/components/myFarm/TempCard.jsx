import React, { useState } from "react";
import SensorDetail from "./SensorDetail";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
} from "@mui/material";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import { useRecoilState } from "recoil";
import { sensorState } from '../../atom'

const TempCard = ({ temp }) => {
  const [open, setOpen] = useRecoilState(sensorState)
  const handleOpen = () => setOpen(true)

  return (
    <>
      {temp !== null ? (
        <Grid item xs={6}>
          <Card
            sx={{ background: "#F7B634" }}
            onClick={handleOpen}
          >
            <CardContent>
              <DeviceThermostatOutlinedIcon />
              <Typography textAlign="center" variant="h5" sx={{ mt: 1 }}>
                <span style={{ fontWeight: "bold" }}>{temp}°C</span>
              </Typography>
            </CardContent>
            <CardActions sx={{ ml: 1 }}>
              <span style={{ fontWeight: "bold" }}>Temp</span>
            </CardActions>
          </Card>
          {/* 센서 디테일 모달창 */}
        </Grid>
      ) : (
        <></>
      )}

    </>
  );
};

export default TempCard;
