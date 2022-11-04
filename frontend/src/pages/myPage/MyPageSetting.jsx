import React from 'react'
import { Modal, Box, IconButton, List, ListItem, ListItemText, Button, FormControlLabel, ButtonGroup, TextField } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: 550,
  bgcolor: '#212528',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1
};

const MyPageSetting = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton sx={{ color: '#B3B3B3' }} onClick={handleOpen}>
        <SettingsIcon fontSize="large" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <List sx={{mt:2}}>
            <ListItem>
              <ListItemText>
                <span style={{ fontSize: '20px' }}>공개/비공개 설정</span>
              </ListItemText>
              <ButtonGroup>
                <Button >공개</Button>
                <Button sx={{ background: 'white' }}>비공개</Button>
              </ButtonGroup>
            </ListItem>
            <hr />
            <ListItem sx={{mt:2}}>
              <p style={{ fontSize: '20px' }}>닉네임 변경</p>
              <Button>변경</Button>
            </ListItem>
            <ListItem>
              <TextField fullWidth variant="outlined" />
            </ListItem>
            <hr />
            <ListItem sx={{mt:2}}>
            <p style={{ fontSize: '20px' }}>로그아웃</p>
            </ListItem>
          </List>
        </Box>
      </Modal>
    </>
  )
}

export default MyPageSetting