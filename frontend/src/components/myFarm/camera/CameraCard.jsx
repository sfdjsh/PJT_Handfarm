import React from "react";
// import Iframe from "react-iframe";
import { useRecoilState } from "recoil";
import { motorControl } from "../../../atom";
import ControlBuzzer from "../control/ControlBuzzer";
import { Container, Typography, Box } from "@mui/material";

const CameraCard = ({ camera, deviceId, value }) => {
  const [motorState, setMotorState] = useRecoilState(motorControl);
  const controlBuzzer = motorState.buzzer;

  return (
    <>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Camera</Typography>
        <Box sx={{ mb: 10 }}>
          <iframe
            src={camera}
            width="100%"
            height="300vh"
            frameBorder="0"
            // style={{ marginRight: '200px' }}
          />
        </Box>
        {/* <ControlBuzzer controlBuzzer={controlBuzzer} deviceId={deviceId} /> */}
    </>
  );
};

export default CameraCard;
