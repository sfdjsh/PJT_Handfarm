import React from "react";
// import Iframe from "react-iframe";
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
        <>
          <Container>
            <div style={{width:'350px', height:'300px'}}>
              <iframe
                src={camera}
                width="360"
                height="310"
                frameBorder="0"
                style={{marginRight:'200px'}}
              />
            </div>
            <ControlBuzzer controlBuzzer={controlBuzzer} deviceId={deviceId} />
          </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CameraCard;
