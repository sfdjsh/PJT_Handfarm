import React from "react";
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
import { useState } from "react";
import { sensorManual } from "../../../pages/api/MyFarm";

const Co2Detail = ({ co2, deviceId }) => {
  const [co2Setting, setCo2Setting] = useState(2000);

  // 슬라이더 최저 온도 설정
  const co2Slider = (event, newValue) => {
    if (typeof newValue === "number") {
      setCo2Setting(newValue);
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
            <Typography color="#FFCD29">초기화</Typography>
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
              이산화탄소 농도 설정
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Slider
                value={co2Setting}
                aria-label="Default"
                valueLabelDisplay="auto"
                sx={{ mr: 2 }}
                min={400}
                max={6000}
                onChange={co2Slider}
              />

              <OutlinedInput
                value={400 < co2Setting < 6000 ? co2Setting : 2000}
                type="number"
                id="outlined-start-adornment"
                size="small"
                endAdornment={
                  <InputAdornment fontWeight="bold">ppm</InputAdornment>
                }
                sx={{ background: "white", width: "17ch", fontWeight: "bold" }}
                onChange={(e) => setCo2Setting(e.target.value)}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              sx={{ width: 80, height: 60, mr: 4, background: "#424B5A" }}
              onClick={() => sensorManual({ deviceId, co2Setting })}
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

export default Co2Detail;
