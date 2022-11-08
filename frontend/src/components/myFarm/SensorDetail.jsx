import React, { useState } from "react";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import { Button, Typography, Modal, Box, Card, Slider, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { sensorState } from '../../atom'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 700,
  bgcolor: "#212528",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SensorDetail = () => {
  const [open, setOpen] = useRecoilState(sensorState)
  console.log(open)
  
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" textAlign="end"
        onClick={() => {setOpen(false)}}>
          X
        </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default SensorDetail;
