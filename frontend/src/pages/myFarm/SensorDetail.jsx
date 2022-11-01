import React from 'react'
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import { Button, Typography, Modal, Box, Card, Slider, TextField } from '@mui/material'

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

const SensorDetail = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" textAlign="end"
          onClick={handleClose}>
            X
          </Typography>

          <Box display='flex' alignItems="center" sx={{ mt: 2 }}>
            <DeviceThermostatOutlinedIcon />
            <Typography flexGrow={1} variant="h6">
              Temp
            </Typography>
            <Typography variant="h5" textAlign="end" color="#F24822">
              24.8C
            </Typography>
          </Box>
          <hr />

          <Card sx={{ height: 140 }}>
            <p>그래프 영역</p>
          </Card>

          <Box display="flex" alignItems="center" sx={{ mt: 4 }}>
            <Typography variant="h6" flexGrow={1} >센서설정</Typography>
            <Typography color="#FFCD29">초기화</Typography>
          </Box>
          <hr />
          <Typography color="#FFA629" fontSize={1}>
            * 최고온도와 최저온도를 설정하면 현재 온도가 설정한 범위를 벗어날 경우 조절하게 됩니다.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h7">최고 온도 설정</Typography>
            <Box display="flex" justifyContent="space-between">
              <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" sx={{ mr: 2 }} />
              <TextField id="outlined-basic" size='small' sx={{
                width: 0.3, ' .MuiOutlinedInput-root': {
                  color: 'black', border: '1px solid white', backgroundColor: '#E6E6E6'
                }
              }} />
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h7">최고 온도 설정</Typography>
            <Box display="flex" justifyContent="space-between">
              <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" sx={{ mr: 2 }} />
              <TextField id="outlined-basic" size='small' sx={{
                width: 0.3, ' .MuiOutlinedInput-root': {
                  color: 'black', border: '1px solid white', backgroundColor: '#E6E6E6'
                }
              }} />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default SensorDetail