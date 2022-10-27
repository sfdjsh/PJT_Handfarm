import React from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import handFarmLogo from '../../pictures/handFarmLogo.png'
import styled from "styled-components";
import {Button} from "@mui/material";

const LogoDiv = styled.div`
  background-image: url(${handFarmLogo});
  width: 300px;
  height: 400px;
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

        </Box>
    );
};

export default FarmmunityMain;