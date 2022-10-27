import React from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";


export const Navbar = () => {
    return (
        <>
            <Box sx={{ display : "flex", justifyContent : "end", alignItems : "center", margin : "20px" }}>
                <NotificationsNoneIcon style={{ color : "white", fontSize : "35px"}}/>
            </Box>
            {/*<Divider style={{ backgroundColor : "white" }}/>*/}
        </>
    );
};

export default Navbar;