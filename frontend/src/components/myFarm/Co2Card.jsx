import React from 'react'
import { Card, CardContent, Typography, CardActions, Grid } from '@mui/material'
import Co2Icon from '@mui/icons-material/Co2';

const Co2Card = ({co2}) => {
  return (
    <>
      {co2 !== null? 
      <Grid item xs={6}>
        <Card sx={{ background: "#757575" }}>
          <CardContent>
            <Co2Icon />
            <Typography textAlign="center" variant="h5" sx={{ mt: 1 }}>
              <span style={{ fontWeight: "bold", color:'white' }}>{co2} ppm</span>
            </Typography>
          </CardContent>
          <CardActions sx={{ ml: 1 }}>
            <span style={{ fontWeight: "bold" }}>Co2</span>
          </CardActions>
        </Card> 
      </Grid>
      : <></>}
    </>    
  )
}

export default Co2Card

