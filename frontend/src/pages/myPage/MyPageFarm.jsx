import React, { useEffect, useState } from "react";
import handFarmLogo from '../../pictures/handFarmLogo.png'
import styled from "styled-components";
import embarrassed from '../../pictures/embarrassed.png'
import BoxSensor from "../../components/common/BoxSensor";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import {userInfo} from "../../atom";
import {useRecoilState} from "recoil";
import Blur from "react-blur";
import handFarm from '../../pictures/handFarmLogo.png'
import './MyPage.css'

const representImg = styled.div`
  background-image: url(${handFarmLogo});
  width: 300px;
  height: 375px;
  margin: 10px;
  border-radius: 10px;
`

const blurDiv = styled.div`
  filter: blur(10px);
  -webkit-filter: blur(10px);
`

const MyPageFarm = ({sensorValue,deviceInfo, userOpen, userNickName}) => {
    const [loginUser, setLoginUser] = useRecoilState(userInfo)
    console.log(deviceInfo)
    console.log(userOpen)

  return (
    <>
        { userOpen || (!userOpen && userNickName === loginUser.userNickname) ?  (
            <>
                <Box sx={{boxShadow: "0 0 5px", background: '#757575', height: 50, mt: 2 }}>
                    { deviceInfo.length !== 0 ? (
                        <>
                            <Typography sx={{ pt: 1.7, pl: 1.5, fontWeight: "bold", color: "#FFA629", fontFamily : "ScoreDream" }} position="fixed">{ deviceInfo.deviceCrop }</Typography>
                        <Typography variant="subtitle1" sx={{ textAlign: 'center', pt: 1.5, fontWeight: "bold",fontFamily : "ScoreDream" }}>{ deviceInfo.deviceName }</Typography>
                        </>
                    ) : (
                        <Typography variant="subtitle1" sx={{ textAlign: 'center', pt: 1.5, fontWeight: "bold",fontFamily : "ScoreDream" }}>등록된 농장이 없는 회원이에요</Typography>
                    ) }
                </Box>
            <Grid container spacing={1} sx={{ mt: 1 }}>
                { deviceInfo.length !== 0 ? (
                    <>
                    { Object.entries(sensorValue).map((sensor, idx) => (
                            <BoxSensor sensor={sensor}  />
                        )) }
                    </>
                ) : (
                    <Box style={{ paddingLeft : "25%" }} sx={{ display : "flex", justifyContent : "center", alignItems : "center" }}>
                    <Box sx={{ mt : 6 , backgroundImage : `url(${embarrassed})`, backgroundSize : "cover", width : "200px", height : "200px" }}>
                    </Box>
                    </Box>
                    ) }
            </Grid>
            </>
        ) : (
            <Box className="blurEffect">
                <Box sx={{boxShadow: "0 0 5px", background: '#757575', height: 50, mt: 2 }}>
                    <Typography sx={{ pt: 1.7, pl: 1.5, fontWeight: "bold", color: "#FFA629", fontFamily : "ScoreDream" }} position="fixed">{ deviceInfo.deviceCrop }</Typography>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', pt: 1.5, fontWeight: "bold",fontFamily : "ScoreDream" }}>{ deviceInfo.deviceName }</Typography>
                </Box>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                    { deviceInfo.length !== 0 ? (
                        <>
                            { Object.entries(sensorValue).map((sensor, idx) => (
                                <BoxSensor sensor={sensor}  />
                            )) }
                        </>
                    ) : (
                        <Box style={{ paddingLeft : "25%" }} sx={{ display : "flex", justifyContent : "center", alignItems : "center" }}>
                            <Box sx={{ mt : 6 , backgroundImage : `url(${embarrassed})`, backgroundSize : "cover", width : "200px", height : "200px" }}>
                            </Box>
                        </Box>
                    ) }
                </Grid>
            </Box>
            ) }
    </>
  )
}

export default MyPageFarm