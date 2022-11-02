import React from 'react';
import Box from "@mui/material/Box";
import SelectForm from "../../components/common/SelectForm";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {Grid} from "@mui/material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {Container} from "@mui/material";
import Divider from "@mui/material/Divider";
import ArticleFilter from "../../components/common/ArticleFilter";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BasicCard from "../../components/common/Card";

const CommunityInfo = () => {

    return (
        <Box>
            <Box sx={{ display : "flex", justifyContent : "start" }}>
                <SelectForm/>
            </Box>
            <Box sx={{ display : "flex", justifyContent : "center", alignItems : "center" }}>
                <Avatar
                    alt="Remy Sharp"
                    src="https://mblogthumb-phinf.pstatic.net/20160430_289/passtheway_1462025191089kdmeN_PNG/%BD%C9%BA%BC%B8%B6%C5%A9%C5%F5%B8%ED.png?type=w2"
                    sx={{ width: 100, height: 100, boxShadow: '1px 2px 9px #F4AAB9' }}
                />
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={7}>
                    <Box sx={{ fontSize : "25px", m : 1, textAlign : "right" }}>광주</Box>
                </Grid>
                <Grid item xs={5}>
                    <Box sx={{ display : "flex" ,fontSize : "20px" ,m : 1.5, alignItems : "center", justifyContent : "center" }}><span style={{ fontSize : "15px", margin : "5px" }}>123</span><PermIdentityIcon/></Box>
                </Grid>
            </Grid>
            <Box sx={{ display : "flex", justifyContent : "center", px : "25px" }}>
                <p style={{ lineHeight : "30px", color : "#B3B3B3" }}>
                    광주에 대한 정보글을 확인해보세요!
                </p>
            </Box>
            <Divider style={{ backgroundColor : "#757575" }}/>
            <Box sx={{ display : "flex", justifyContent : "start" }}>
                <ArticleFilter/>
            </Box>
            <Box>
                <BasicCard/>
            </Box>
        </Box>
    );
};

export default CommunityInfo;