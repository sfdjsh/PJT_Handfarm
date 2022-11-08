import React from 'react'
import { Card, CardContent, Typography, CardActions, Grid } from '@mui/material'
import OpacityIcon from '@mui/icons-material/Opacity';

const HumidCard = ({humid}) => {
  return (
    <>
      {humid !== null? 
      <Grid item xs={6}>
        <Card sx={{ background: "#9747FF" }}>
          <CardContent>
            <OpacityIcon />
            <Typography textAlign="center" variant="h5" sx={{ mt: 1 }}>
              <span style={{ fontWeight: "bold" }}>{humid} lx</span>
            </Typography>
          </CardContent>
          <CardActions sx={{ ml: 1 }}>
            <span style={{ fontWeight: "bold" }}>Humid</span>
          </CardActions>
        </Card> 
      </Grid>
      : <></>}
    </>    
  )
}

export default HumidCard

