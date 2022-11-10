import React, { useState } from "react";
import TempDetail from "./TempDetail";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
} from "@mui/material";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import { useRecoilState } from "recoil";
import { tempModal } from '../../atom'

const TempCard = ({ temp, deviceId }) => {
  const [onTemp, setOnTemp] = useRecoilState(tempModal)

  const handleOpen = () => setOnTemp(true)

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
        </Grid>
      ) : (
        <></>
      )}
      <TempDetail temp={temp} deviceId={deviceId} />
    </>
  );
};

export default TempCard;
