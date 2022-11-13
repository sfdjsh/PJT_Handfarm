import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  Typography,
  Box,
  Card,
  Slider,
  Button,
  InputAdornment,
  OutlinedInput,
  CardContent,
} from "@mui/material";
import { sensorManual } from "../../../pages/api/MyFarm";

const SoilHumidDetail = ({ humid, deviceId }) => {
  const [soilHumidSetting, setSoilHumidSetting] = useState(50);

  const soilHumidSlider = (event, newValue) => {
    if (typeof newValue === "number") {
      setSoilHumidSetting(newValue);
    }
  };

  return (
    <>
      <Card sx={{ mt: 2, backgroundColor: "#1E1E1E" }}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Typography
              variant="h6"
              flexGrow={1}
              fontWeight="bold"
              color="white"
            >
              센서설정
            </Typography>
          </Box>
          <hr />
          <Box sx={{ mt: 1 }}>
            <Typography color="#FFA629" variant="subtitle2">
              * 온도를 설정하면 현재 온도가 설정한 범위를 벗어날 경우 조절하게
              됩니다.
            </Typography>
            <Typography sx={{ mt: 1 }} color="#FFA629" variant="subtitle2">
              * 온도 설정 범위는 -10°C ~ 40°C 까지입니다.
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h7" color="white">
              토양 습도 설정
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Slider
                value={soilHumidSetting}
                aria-label="Default"
                valueLabelDisplay="auto"
                sx={{ mr: 2 }}
                min={0}
                max={100}
                onChange={soilHumidSlider}
              />
              <OutlinedInput
                value={0 < soilHumidSetting < 100 ? soilHumidSetting : 100}
                type="number"
                id="outlined-start-adornment"
                size="small"
                endAdornment={
                  <InputAdornment fontWeight="bold">%</InputAdornment>
                }
                sx={{ background: "white", width: "17ch", fontWeight: "bold" }}
                onChange={(e) => setSoilHumidSetting(e.target.value)}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              sx={{ width: 80, height: 60, mr: 4, background: "#424B5A" }}
              onClick={() => sensorManual({ deviceId, soilHumidSetting })}
            >
              <h3>등록</h3>
            </Button>
            <Button
              variant="contained"
              sx={{ width: 80, height: 60, background: "#757575" }}
            >
              <h3>취소</h3>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default SoilHumidDetail;
