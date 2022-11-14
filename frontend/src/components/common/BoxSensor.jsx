import React from 'react';
import {Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import AirIcon from '@mui/icons-material/Air';
import LightModeIcon from '@mui/icons-material/LightMode';
import OpacityIcon from '@mui/icons-material/Opacity';
import AlarmIcon from '@mui/icons-material/Alarm';


const BoxSensor = ({sensor}) => {
    const logoList = {
        temp : <DeviceThermostatOutlinedIcon/>,
        led : <LightModeIcon/>,
        pump : <OpacityIcon/>,
        fan : <AirIcon/>,
        buzzer : <AlarmIcon/>
        }
    const colorList = {
        temp : "#F7B634",
        led : "#F7B634",
        pump : "#9747FF",
        fan : "#9747FF",
        buzzer : "#F7B634"
    }
    if(sensor[0] === "temp"){
        console.log(sensor[1].split(',')[0].split('[')[1])
        console.log(sensor[1].split(',')[1].split(']')[0])
    }


    return (
        <Grid item xs={6}>
            <Card sx={{ background: colorList[`${sensor[0]}`],height : "100%", boxShadow: "0 0 5px" }}>
                <CardContent>
                    {/*<DeviceThermostatOutlinedIcon />*/}
                    { logoList[`${sensor[0]}`] }
                    <Typography textAlign="center" variant="h5" sx={{ mt: 1, fontFamily : "ScoreDream" }}>
                        { sensor[0] !== "temp" ? (
                            <>
                            <span style={{ fontWeight: "bold", fontFamily : "ScoreDream" }}>{ sensor[1] }</span>
                            <br/>
                                {/*<span style={{ fontWeight: "bold", fontSize : "15px", fontFamily : "ScoreDream" }}>최저온도 : { sensor[1].split(',')[1].split(']')[0] }</span>*/}
                            </>
                        ) : (
                            <span style={{ fontWeight: "bold", fontFamily : "ScoreDream" }}><span style={{ color : "red" }}>{ sensor[1].split(',')[0].split('[')[1] }℃</span> / <span style={{ color : "blue" }}>{ sensor[1].split(',')[1].split(']')[0] }℃</span></span>

                        ) }
                        {/*<span style={{ fontWeight: "bold", fontFamily : "ScoreDream" }}>{ sensor[1] }</span>*/}
                    </Typography>
                </CardContent>
                <CardActions sx={{ ml: 1, position : "relative", bottom : 0 }}>
                    <span style={{ fontWeight: "bold", fontFamily : "ScoreDream" }}>{ sensor[0] }</span>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default BoxSensor;