import React from 'react'
import { useRecoilState } from "recoil";
import { humidModal } from '../../atom'
import { Typography, Modal, Box, Card, Slider, TextField } from "@mui/material";
import OpacityIcon from '@mui/icons-material/Opacity';

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

const HumidDetail = ({humid}) => {
  const [onHumid, setOnHumid] = useRecoilState(humidModal)
  
  return (
    <Modal
        open={onHumid}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" textAlign="end"
            onClick={() => { setOnHumid(false) }}
            >
            X
          </Typography>
          
          <Box display='flex' alignItems="center" sx={{ mt: 2 }}>
          <OpacityIcon />
            <Typography flexGrow={1} variant="h6" fontWeight="bold">
              Humid
            </Typography>
            <Typography variant="h5" textAlign="end" color="#F24822" fontWeight="bold">
              {humid}ppm
            </Typography>
          </Box>
          <hr />

          <Card sx={{ height:140, mt:1 }}>
            <p>그래프 영역</p>
          </Card>

          <Box display="flex" alignItems="center" sx={{ mt: 4 }}>
            <Typography variant="h6" flexGrow={1} >센서설정</Typography>
            <Typography color="#FFCD29">초기화</Typography>
          </Box>
          <hr />
          <Typography color="#FFA629" fontSize={1}>
            * 
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
  )
}

export default HumidDetail