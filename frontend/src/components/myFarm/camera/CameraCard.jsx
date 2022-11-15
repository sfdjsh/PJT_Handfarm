import React from "react";
import Iframe from "react-iframe";
import { useRecoilState } from "recoil";
import { motorControl } from "../../../atom";
import ControlBuzzer from "../control/ControlBuzzer";
import { Container } from "@mui/material";

const CameraCard = ({ camera, deviceId, value }) => {
  const [motorState, setMotorState] = useRecoilState(motorControl);
  const controlBuzzer = motorState.buzzer;

  return (
    <>
      {value === 6 ? (
        <Container>
          <iframe
            src={camera}
            width="358vh"
            height="300vh"
            allow="fullscreen"
            display="block"
          />
            <ControlBuzzer controlBuzzer={controlBuzzer} deviceId={deviceId} />
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default CameraCard;
