import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useNavigate} from "react-router-dom";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function BasicCard({ title, idx, content }) {
    const navigator = useNavigate()

    return (
        <Card sx={{ minWidth: 275, backgroundColor : "#696969", mt : 2,  mx : 2, height : "150px" }}
              onClick={() => {
                  navigator(`/community/${idx}`)}}
        >
            <CardContent sx={{ mb : 0 }}>
                <Typography sx={{ fontSize: 15, color : "white", fontWeight : "bold", textAlign : "left", fontFamily : "ScoreDream" }} color="text.secondary" gutterBottom>
                    { title }
                </Typography>
                {/*<Typography variant="h5" component="div" sx={{ textAlign : "left" }}>*/}
                {/*    be{bull}nev{bull}o{bull}lent*/}
                {/*</Typography>*/}
                {/*<Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
                {/*    adjective*/}
                {/*</Typography>*/}
                <Typography sx={{  fontFamily : "ScoreDream", color : "white", mb : 2  }} variant="body2">
                    { content }
                    {/*<br />*/}
                    {/*{'"a benevolent smile"'}*/}
                </Typography>
                <Divider sx={{ backgroundColor : "white" }}/>
            </CardContent>
            {/*<CardActions>*/}
            {/*    <Button size="small">Learn More</Button>*/}
            {/*</CardActions>*/}
            <Box sx={{ ml : 1 ,display : "flex" ,fontSize : "20px", alignItems : "center", justifyContent : "start", color : "white" }}>
                <PermIdentityIcon/>
                <span style={{ fontSize : "15px", margin : "5px" }}>123</span>
                <FavoriteBorderIcon/>
                <span style={{ fontSize : "15px", margin : "5px" }}>1234</span>
            </Box>
        </Card>
    );
}
