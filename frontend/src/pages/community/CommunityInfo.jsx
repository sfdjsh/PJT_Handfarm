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
import {fetchInfoArticle} from "../api/Farmmunity";
import {useEffect, useState} from "react";
import {nowCrop} from "../../atom";
import {useRecoilState} from "recoil";
import {useNavigate} from "react-router-dom";


export const CommunityInfo = () => {
    const navigator = useNavigate()
    const [infoArticle, setInfoArticle] = useState([])
    const [crop, setCrop] = useRecoilState(nowCrop)
    const [cropInfo, setCropInfo] = useState([])

    useEffect(() => {
        const getArticle = fetchInfoArticle(crop)
            .then((res) => res.json().then((res) => {
                console.log(res)
                setInfoArticle(res.articleList)
                setCropInfo(res.articleInfo)
            }))
    },[crop])

    console.log(cropInfo)
    console.log(infoArticle)

    return (
        <Box>
            <Box sx={{ display : "flex", justifyContent : "start" }}>
                <SelectForm/>
            </Box>
            <Box sx={{ display : "flex", justifyContent : "center", alignItems : "center" }}>
                <Avatar
                    alt="Remy Sharp"
                    src={cropInfo.cropImg}
                    sx={{ width: 100, height: 100, boxShadow: '1px 2px 9px #F4AAB9' }}
                />
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={7}>
                    <Box sx={{ fontSize : "25px", m : 1, textAlign : "right" }}>{ cropInfo.cropName }</Box>
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
                { infoArticle.map((article, index) => (
                    <>
                    <Grid key={index} container spacing={1} onClick={() => {
                        navigator(`/community/${article.idx}`)
                    }}>
                        <Grid item xs={4}>
                            <Avatar
                                alt="Remy Sharp"
                                src={article.articleImg}
                                sx={{ m : 2, width: 100, height: 100, boxShadow: '1px 2px 9px #F4AAB9' }}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <p style={{ textAlign : "left", lineHeight : "25px", color : "white", margin : "0px" , marginTop : "45px", textOverflow : "ellipsis", overflow : "hidden", whiteSpace : "nowrap" }}>
                                {article.articleTitle}
                            </p>
                            <Box sx={{mt : 2, display : "flex" ,fontSize : "20px", alignItems : "center", justifyContent : "start", color : "#B3B3B3" }}><span style={{ fontSize : "15px", margin : "5px" }}>{article.commentCount}</span><PermIdentityIcon/><span style={{ fontSize : "15px", margin : "5px" }}>{article.likeCount}</span><FavoriteBorderIcon/></Box>
                        </Grid>
                    </Grid>
                    <Divider sx={{ backgroundColor : "#757575", marginLeft: '5%', marginRight: '5%' }}/>
                    </>
                    )) }
                <DialButton now="정보"/>
            </Box>
        </Box>
    );
};

export default CommunityInfo;