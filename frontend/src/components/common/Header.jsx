import React, {useEffect} from 'react';
import { AppBar, IconButton, Divider, Box } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/NotificationsNone';
import { display } from '@mui/system';

export const Header = () => {
  return (
    <>
      <Box sx={{ display:"flex", justifyContent:"end", alignItems:"center" }}>
          <IconButton size='large' color='inherit'>
              <NotificationsIcon />
          </IconButton>
      </Box>
    </>
  )
}

export default Header;