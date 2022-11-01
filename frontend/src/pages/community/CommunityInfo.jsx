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
import DialButton from "../../components/common/DialButton";

const CommunityInfo = () => {

    return (
        <Box>
            <Box sx={{ display : "flex", justifyContent : "start" }}>
                <SelectForm/>
            </Box>
            <Box sx={{ display : "flex", justifyContent : "center", alignItems : "center" }}>
                <Avatar
                    alt="Remy Sharp"
                    src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201502/04/htm_20150204185442c010c011.jpg"
                    sx={{ width: 100, height: 100, boxShadow: '1px 2px 9px #F4AAB9' }}
                />
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={7}>
                    <Box sx={{ fontSize : "25px", m : 1, textAlign : "right" }}>딸기</Box>
                </Grid>
                <Grid item xs={5}>
                    <Box sx={{ display : "flex" ,fontSize : "20px" ,m : 1.5, alignItems : "center", justifyContent : "center" }}><span style={{ fontSize : "15px", margin : "5px" }}>123</span><PermIdentityIcon/></Box>
                </Grid>
            </Grid>
            <Box sx={{ display : "flex", justifyContent : "center", px : "25px" }}>
                <p style={{ lineHeight : "30px", color : "#B3B3B3" }}>
                    딸기에 대한 정보글을 확인해보세요!
                </p>
            </Box>
            <Divider style={{ backgroundColor : "white" }}/>
            <Box sx={{ display : "flex", justifyContent : "start" }}>
                <ArticleFilter/>
            </Box>
            <Box>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Avatar
                            alt="Remy Sharp"
                            src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201502/04/htm_20150204185442c010c011.jpg"
                            sx={{ m : 2, width: 100, height: 100, boxShadow: '1px 2px 9px #F4AAB9' }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <p style={{ textAlign : "left", lineHeight : "25px", color : "white", margin : "0px" , marginTop : "45px", textOverflow : "ellipsis", overflow : "hidden", whiteSpace : "nowrap" }}>
                            딸기 키우는 개꿀팁 방출!
                        </p>
                        <Box sx={{mt : 2, display : "flex" ,fontSize : "20px", alignItems : "center", justifyContent : "start", color : "#B3B3B3" }}><span style={{ fontSize : "15px", margin : "5px" }}>123</span><PermIdentityIcon/><span style={{ fontSize : "15px", margin : "5px" }}>1234</span><FavoriteBorderIcon/></Box>
                    </Grid>
                </Grid>
                <Divider sx={{ backgroundColor : "#757575", marginLeft: '5%', marginRight: '5%' }}/>
                <DialButton/>
            </Box>
        </Box>
    );
};

export default CommunityInfo;