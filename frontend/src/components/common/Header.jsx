import React, {useEffect} from 'react';
import { AppBar, IconButton, Divider, Box } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/NotificationsNone';
import { display } from '@mui/system';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const navigator = useNavigate()

  return (
    <>
      <Grid container spacing={1}>
          <Grid item xs={6} sx={{ display : "flex", justifyContent : "start", alignItems : "center" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;<ArrowBackIosIcon onClick={() => navigator(-1)}/>
          </Grid>
          <Grid item xs={6} sx={{ display:"flex", justifyContent:"end", alignItems:"center" }}>
              <IconButton size='large' color='inherit'>
                  <NotificationsIcon sx={{ fontSize : "30px" }} />
              </IconButton>
          </Grid>
      </Grid>
    </>
  )
}

export default Header;