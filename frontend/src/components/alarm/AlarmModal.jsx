import React from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  height: 500,
  bgcolor: '#212528',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AlarmModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>ㅇㅋ</div>
        </Box>
      </Modal>
    </>
  )
}

export default AlarmModal