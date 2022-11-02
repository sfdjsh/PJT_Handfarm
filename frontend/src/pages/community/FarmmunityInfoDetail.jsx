import React from 'react';
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


export const FarmmunityInfoDetail = () => {

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item xs={3} sx={{ display : "flex", justifyContent : "end", alignItems : "center" }}>
                    <Avatar
                        alt="Remy Sharp"
                        src="http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg"
                        sx={{ width : 50, height : 50, mr : 1 }}
                    />
                </Grid>
                <Grid item xs={9}>
                    <p style={{ textAlign : "left", lineHeight : "25px", color : "white", margin : "0px" ,  textOverflow : "ellipsis", overflow : "hidden", whiteSpace : "nowrap", marginTop : "5px" }}>
                        kiki249
                    </p>
                    <Box sx={{ display : "flex" ,fontSize : "15px", alignItems : "center", justifyContent : "start", color : "#B3B3B3" }}><MailOutlineIcon/> &nbsp;쪽지보내기</Box>
                </Grid>
            </Grid>
            <Typography variant="h5" component="h5" sx={{ fontFamily : "ScoreDream" ,mt : 2, mx : 3 }}>딸기 기르는 개꿀팁!</Typography>
            <Box sx={{ mx : 3, mt : 2 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo lectus in lobortis mollis. Donec ornare purus tincidunt faucibus ultricies. Praesent vitae risus ligula. Fusce vitae erat id est viverra aliquam id eu erat. In hac habitasse platea dictumst. Donec pretium ut mi mattis sagittis. Nullam non congue dui.

                Cras vehicula neque ac dolor bibendum efficitur. Nunc lacus quam, pulvinar in imperdiet eget, pulvinar sit amet tortor. Pellentesque maximus et lectus in sagittis. Nullam efficitur, mi id accumsan gravida, quam erat venenatis libero, id bibendum justo elit id massa. Praesent dignissim lorem a lacus pulvinar malesuada. Fusce est quam, fringilla sed fringilla id, luctus vitae elit. Fusce efficitur nisi a nisi imperdiet venenatis. Curabitur in convallis elit, nec dignissim nibh. Nulla pharetra, diam non congue vestibulum, nisi lacus lobortis urna, at euismod nibh arcu non enim.
            </Box>
        <Box sx={{ mt : 1, mx : 3 }}>
            <FavoriteIcon sx={{ color : "red", fontSize : "18px" }}/>&nbsp;999
        </Box>
            <Divider sx={{ mt : 2 , backgroundColor : "#757575" }}/>
            <Typography sx={{ mx : 3, mt : 2 }}>
                댓글 <span style={{ color : "red" }}>15</span>
            </Typography>
            <Grid container spacing={1} sx={{ mt : 1 }}>
                <Grid item xs={3} sx={{ display : "flex", justifyContent : "end", alignItems : "center" }}>
                    <Avatar
                        alt="Remy Sharp"
                        src="http://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg"
                        sx={{ width : 50, height : 50, mr : 1 }}
                    />
                </Grid>
                <Grid item xs={9}>
                    <p style={{ textAlign : "left", lineHeight : "25px", color : "white", margin : "0px" ,  textOverflow : "ellipsis", overflow : "hidden", whiteSpace : "nowrap", marginTop : "5px" }}>
                        kiki249
                    </p>
                    <p style={{ margin : "1px" ,fontSize : "15px", color : "#B3B3B3",textOverflow : "ellipsis", overflow : "hidden", whiteSpace : "nowrap" }}>이거 ㄹㅇ임 ㅋㅋ 따라하면 완전 잘나옴</p>
                    <p style={{ marginTop : "10px", color : "blueviolet" }}>답글 2</p>
                </Grid>
            </Grid>
            <Divider sx={{ backgroundColor : "#757575", marginLeft: '5%', marginRight: '5%' }}/>
            {/*<Box sx={{*/}
            {/*    width : "100vw",*/}
            {/*    position : "fixed",*/}
            {/*    bottom : 10,*/}
            {/*    height : '40px',*/}
            {/*    border : "1px solid",*/}
            {/*    borderTopLeftRadius : "10px",*/}
            {/*    borderTopRightRadius : "10px",*/}
            {/*}}>*/}
            {/*<TextField fullWidth sx={{*/}
            {/*    backgroundColor : "white",*/}
            {/*    borderTopLeftRadius : "10px",*/}
            {/*    borderTopRightRadius : "10px",*/}
            {/*}}*/}
            {/*placeholder="댓글을 입력해주세요"*/}
            {/*/>*/}
            {/*</Box>*/}
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
                    />
                </Grid>
                <Grid item xs={3} sx={{ paddingLeft : "16px" }}>
                    <Button variant="contained" style={{
                        backgroundColor : "#FFA629",
                        marginTop : "9px",
                        marginLeft : "10px",
                        fontFamily : "ScoreDream"
                    }}>작성</Button>
                </Grid>
            </Grid>
        </Box>

    );
};

export default FarmmunityInfoDetail;