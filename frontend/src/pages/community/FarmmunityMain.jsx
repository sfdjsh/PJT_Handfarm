import React from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import handFarmLogo from '../../pictures/handFarmLogo.png'
import styled from "styled-components";
import {Button} from "@mui/material";

const LogoDiv = styled.div`
  background-image: url(${handFarmLogo});
  width: 300px;
  height: 375px;
  margin: 10px;
  border-radius: 10px;
`


const FarmmunityMain = () => {
    return (
        <Box>
            <Typography sx={{ fontWeight : "bold", mt : 5 }} variant="h4" component="h3">🍒Farmmunity🍓</Typography>
            {/*<img style={{ width : "300px", height : "400px" }} alt="logo" src={handFarmLogo}  />*/}
            {/*<Box sx={{ backgroundImage : url(${handFarmLogo}) }}></Box>*/}
            <Box sx={{ display : "flex", justifyContent: "center", alignItems : "center" }}>
                <LogoDiv/>
            </Box>
            <Box sx={{ display : "flex", justifyContent : "center", alignItems : "center", flexDirection : "column" }}>
                <Typography variant="h5" component="h5" sx={{ fontSize : "15px", marginTop : "10px", color : '#B3B3B3', mb: 0.5, fontFamily : "ScoreDream" }}>나만의 노하우를 공유해보세요!</Typography>
                <Button style={{ backgroundColor : "#FFA629"}} sx={{ width : "300px", height : "50px", fontFamily : "ScoreDream", fontSize : "15px" }} variant="contained" disableElevation>
                    정보 공유
                </Button>
                <Typography variant="h5" component="h5" sx={{ fontSize : "15px", marginTop : "40px", color : '#B3B3B3',mb: 0.5, fontFamily : "ScoreDream" }}>주변 회원과 소통해보세요!</Typography>
                <Button style={{ backgroundColor : "#FFA629"}} sx={{ width : "300px", height : "50px", fontFamily : "ScoreDream", fontSize : "15px" }} variant="contained" disableElevation>
                    지역 게시판
                </Button>
            </Box>

        </Box>
    );
};

export default FarmmunityMain;