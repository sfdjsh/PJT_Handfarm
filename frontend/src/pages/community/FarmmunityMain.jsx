import React from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import handFarmLogo from '../../pictures/handFarmLogo.png'
import styled from "styled-components";
import {Button} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Divider from "@mui/material/Divider";

const LogoDiv = styled.div`
  background-image: url(${handFarmLogo});
  width: 300px;
  height: 375px;
  margin: 10px;
  border-radius: 10px;
`


const FarmmunityMain = () => {
    const navigator = useNavigate();

    return (
        <Box>
            <Typography sx={{ fontWeight : "bold", mt : 2, textAlign : "center" }} variant="h4" component="h3">🍒Farmmunity🍓</Typography>
            {/*<Box sx={{ backgroundImage : url(${handFarmLogo}) }}></Box>*/}
            <Divider sx={{ m : 1, backgroundColor : "#757575" }}/>
            <Box sx={{ display : "flex", justifyContent: "center", alignItems : "center" }}>
                {/*<img style={{ width : "300px", height : "400px" }} alt="logo" src="handFarmNew.png"  />*/}
                <LogoDiv/>
            </Box>
            <Box sx={{ display : "flex", justifyContent : "center", alignItems : "center", flexDirection : "column" }}>
                <Typography variant="h5" component="h5" sx={{ fontSize : "15px", marginTop : "10px", color : '#B3B3B3', mb: 0.5, fontFamily : "ScoreDream" }}>나만의 노하우를 공유해보세요!</Typography>
                <Button
                    onClick={() => { navigator('/community/info')}}
                    style={{ backgroundColor : "#FFA629"}}
                    sx={{ width : "300px", height : "50px", fontFamily : "ScoreDream", fontSize : "15px" }} variant="contained" disableElevation>
                    정보 공유
                </Button>
                <Typography variant="h5" component="h5" sx={{ fontSize : "15px", marginTop : "40px", color : '#B3B3B3',mb: 0.5, fontFamily : "ScoreDream" }}>주변 회원과 소통해보세요!</Typography>
                <Button
                    onClick={() => { navigator('/community/region') }}
                    style={{ backgroundColor : "#FFA629"}}
                    sx={{ width : "300px", height : "50px", fontFamily : "ScoreDream", fontSize : "15px" }} variant="contained" disableElevation>
                    지역 게시판
                </Button>
            </Box>

        </Box>
    );
};

export default FarmmunityMain;