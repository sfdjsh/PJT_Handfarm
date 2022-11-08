import React from 'react'
import { Card, CardContent, Typography, CardActions, Grid } from '@mui/material'
import InvertColorsIcon from '@mui/icons-material/InvertColors';

const SoilHumidCard = ({soilHumid}) => {
  return (
    <>
      {soilHumid !== null? 
      <Grid item xs={6}>
        <Card sx={{ background: "#F7B634" }}>
          <CardContent>
            <InvertColorsIcon />
            <Typography textAlign="center" variant="h5" sx={{ mt: 1 }}>
              <span style={{ fontWeight: "bold" }}>{soilHumid} ppm</span>
            </Typography>
          </CardContent>
          <CardActions sx={{ ml: 1 }}>
            <span style={{ fontWeight: "bold" }}>SoilHumid</span>
          </CardActions>
        </Card> 
      </Grid>
      : <></>}
    </>    
  )
}

export default SoilHumidCard

