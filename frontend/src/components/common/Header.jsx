import React from 'react';
import { AppBar, IconButton, Divider } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export const Header = () => {
  return (
    <>
      <AppBar positionStatic
      sx={{p:1, backgroundColor:'#212528'}}>
        {/* <IconButton
          size='large'
          edge='start'
          sx={{mr : 2}}> */}
          <Box>
            <NotificationsNoneIcon sx={{flexDirection :'row', alignItems: 'start'}}/>
          </Box>
          {/* </IconButton> */}
      </AppBar>
      <hr />
    </>
  )
}

export default Header;