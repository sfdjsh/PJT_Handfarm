import React from 'react'
import { Card, CardContent, Typography, CardActions, Grid } from '@mui/material'
import OpacityIcon from '@mui/icons-material/Opacity';
import { useRecoilState } from "recoil";
import { humidModal } from '../../atom'
import HumidDetail from './HumidDetail'

const HumidCard = ({humid}) => {
  const [onHumid, setOnHumid] = useRecoilState(humidModal)

  const handleOpen = () => setOnHumid(true)

  return (
    <>
      {humid !== null? 
      <Grid item xs={6}>
        <Card sx={{ background: "#9747FF" }}
        onClick={handleOpen}
        >
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
      <HumidDetail humid={humid} />
    </>    
  )
}

export default HumidCard

