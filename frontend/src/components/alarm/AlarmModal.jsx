import React from "react";
import AlarmInfo from "./AlarmInfo";
import { Box, Modal, Button } from "@mui/material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  height: 700,
  bgcolor: "#212528",
  border: "2px solid #000",
  boxShadow: 24,
};

const AlarmModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <NotificationsNoneIcon
        sx={{ fontSize: "30px" }}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AlarmInfo />
        </Box>
      </Modal>
    </>
  );
};

export default AlarmModal;
