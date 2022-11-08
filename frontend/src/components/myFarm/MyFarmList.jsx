import React from 'react'
import { Container, Box, Grid, IconButton, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import SettingsIcon from "@mui/icons-material/Settings";

const MyFarmList = ({ devices }) => {
  console.log(devices)
  return (
    <div>
      {devices.map((device) => (
        <p>{device.cropName}</p>
      ))}
    </div>
  )
}

export default MyFarmList