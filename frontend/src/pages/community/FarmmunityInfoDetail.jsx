import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {Grid} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import {Button} from "@mui/material";
import {fetchArticleDetail} from "../api/Farmmunity";
import {useLocation} from "react-router-dom";
import {useRef} from "react";
import {useMemo} from "react";
import {commentCreate} from "../api/Farmmunity";


export const FarmmunityInfoDetail = () => {
    const location = useLocation();
    const articleNum = parseInt(location.pathname.split('/')[2])
    const [article, setArticle] = useState([])
    const [isShowMore, setIsShowMore] = useState(false); // 더보기 열고 닫는 스위치
    const textLimit = useRef(23); 			// 글자수 제한 선언
    const text = "원본에서 글자 수만큼 잘라서 짧은 버전을 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"
    const [commentList, setCommentList] = useState([])
    const [commentInput, setCommentInput] = useState("")
    const [onPost, setOnPost] = useState(true)
    console.log(article)
    console.log(commentList)

    const commenter = (text) => { 		// 조건에 따라 게시글을 보여주는 함수
        const shortReview =
            text.slice(0, textLimit.current); 	// 원본에서 글자 수만큼 잘라서 짧은 버전을 준비하자

        if (text.length > textLimit.current) { 	// 원본이 길면 (원본 글자수 > 제한된 갯수)
            if (isShowMore) { return text; } 	// 더보기가 true 면 원본 바로 리턴
            return shortReview;			// (더보기가 false면) 짧은 버전 리턴해주자
        }
        return text; 			// 그렇지않으면 (짧은 글에는) 쓴글 그대로 리턴!
    } 			// 얘는 isShowMore의 상태가 바뀔때마다 호출된다

    useEffect(() => {
        console.log("여기옴")
        window.scrollTo(0,document.body.scrollHeight)
    },[onPost])

    useEffect(() => {
        const getArticle = fetchArticleDetail(articleNum)
            .then((res) => res.json().then((res) => {
                console.log(res)
                setArticle(res.articleDto)
                setCommentList(res.commentList)
            }))
    },[onPost])

    const handleCommentchange = (e) => {
        setCommentInput(e.target.value)
        console.log(commentInput)
    }

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const postComment = (articleId) => {
        if(commentInput === "") return;
        const postComment = commentCreate(articleId, commentInput)
            .then((res) => res.json().then((res) => {
                console.log(res)
                setOnPost(!onPost)
                setCommentInput("")
            }))
    }

    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item xs={3} sx={{ display : "flex", justifyContent : "end", alignItems : "center" }}>
                    <Avatar
                        alt="Remy Sharp"
                        src={ article.articleUserProfile }
                        sx={{ width : 50, height : 50, mr : 1 }}
                    />
                </Grid>
                <Grid item xs={9}>
                    <p style={{ textAlign : "left", lineHeight : "25px", color : "white", margin : "0px" ,  textOverflow : "ellipsis", overflow : "hidden", whiteSpace : "nowrap", marginTop : "5px" }}>
                        { article.articleUserNickname }
                    </p>
                    <Box sx={{ display : "flex" ,fontSize : "15px", alignItems : "center", justifyContent : "start", color : "#B3B3B3" }}><MailOutlineIcon/> &nbsp;채팅보내기</Box>
                </Grid>
            </Grid>
            <Typography variant="h5" component="h5" sx={{ fontFamily : "ScoreDream" ,mt : 2, mx : 3 }}>{ article.articleTitle }</Typography>
            <Grid container spacing={1}>
                <Grid item xs={12} sx={{ display : "flex", justifyContent : "center",alignItems : "left",flexDirection : "column", mx : 3, mt : 2 }} dangerouslySetInnerHTML={{ __html: article.articleContent }}>
                </Grid>
            </Grid>
        <Box sx={{ mt : 1, mx : 3 }}>
            <FavoriteIcon sx={{ color : "red", fontSize : "18px" }}/>&nbsp;999
        </Box>
            <Divider sx={{ mt : 2 , backgroundColor : "#757575" }}/>
            <Typography sx={{ mx : 3, mt : 2 }}>
                댓글 <span style={{ color : "red" }}>{ commentList.length }</span>
            </Typography>
            { commentList.map((comment, index) => (
                <>
                    <Grid container spacing={1} sx={{ mt : 1 }} key={index}>
                        <Grid item xs={3} sx={{ display : "flex", justifyContent : "end", alignItems : "start", mt : 2 }}>
                            <Avatar
                                alt="Remy Sharp"
                                src={ comment.userProfileImg }
                                sx={{ width : 50, height : 50, mr : 1 }}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <p style={{ textAlign : "left", lineHeight : "25px", color : "#B3B3B3", margin : "0px" ,  textOverflow : "ellipsis", overflow : "hidden", whiteSpace : "nowrap", marginTop : "5px" }}>
                                { comment.userNickName }
                            </p>
                            <div style={{ margin : "1px" ,fontSize : "15px",  mr : 3 }}>
                                {commenter(comment.commentContent)}
                            </div>
                            <Box sx={{ color : "#B3B3B3" }} onClick={() => setIsShowMore(!isShowMore)}>
                                {(comment.commentContent.length > textLimit.current) && (isShowMore ? '[닫기]' : '...더보기')}
                            </Box>
                            {/*<p style={{ marginTop : "10px", color : "blueviolet" }}>답글 2</p>*/}
                        </Grid>
                    </Grid>
                    <Divider sx={{ backgroundColor : "#757575", marginLeft: '5%', mt : 1 }}/>
                </>
                ))}
            <Grid container spacing={1} sx={{
                width : "100vw",
                position : "fixed",
                bottom : 0,
                backgroundColor : "#212528",
                marginLeft : "0px",
                border  : "1px solid #B3B3B3"
            }}>
                <Grid item xs={9}>
                    <TextField
                        fullWidth
                        sx={{
                            ' .MuiOutlinedInput-root': {
                                color: 'black',
                                border : '0px solid #B3B3B3',
                                backgroundColor : "#B3B3B3",
                                fontFamily : "ScoreDream"
                            },
                            mb : 1
                    }}
                        placeholder="댓글을 입력해주세요"
                        onChange={handleCommentchange}
                        value={commentInput}
                    />
                </Grid>
                <Grid item xs={3} sx={{ paddingLeft : "16px" }}>
                    <Button variant="contained" style={{
                        backgroundColor : "#FFA629",
                        marginTop : "9px",
                        marginLeft : "10px",
                        fontFamily : "ScoreDream"
                    }}
                    onClick={() => {
                        postComment(articleNum)
                    }}
                    >작성</Button>
                </Grid>
            </Grid>
        </Box>

    );
};

export default FarmmunityInfoDetail;