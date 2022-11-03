import { Container, Box, Divider, TextField, Button } from '@mui/material';
import React from 'react';

export const FarmCreate = () => {
    return (
        <Container>
            <Box style={{ textAlign: 'left', }}>
                <h2 style={{ marginBottom: 'auto', marginLeft: '5px' }}>내 농장 등록하기</h2>
                <Divider style={{ backgroundColor: "white" }} />

                <Container>
                    <Box sx={{mt:3}}>
                        <h3>기기</h3>
                        <TextField variant="outlined" label="기기 등록" fullWidth
                        sx={{
                            ' .MuiOutlinedInput-root': {
                                color: 'black',
                                border : '1px solid white',
                                backgroundColor : "white"
                            }}} />
                    </Box>
                    <Box sx={{mt:3}}>
                        <h3>농장 이름</h3>
                        <TextField variant="outlined" label="농장 이름을 등록해주세요." fullWidth
                        sx={{
                            ' .MuiOutlinedInput-root': {
                                color: 'black',
                                border : '1px solid white',
                                backgroundColor : "white",
                            }}} />
                    </Box>
                    <Box sx={{mt:3}}>
                        <h3>작물</h3>
                        <TextField variant="outlined" label="작물을 등록해주세요." fullWidth
                        sx={{
                            ' .MuiOutlinedInput-root': {
                                color: 'black',
                                border : '1px solid white',
                                backgroundColor : "white"
                            }}} />
                    </Box>
                </Container>

                <Box style={
                    { display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
                    <Button variant="contained" sx={{ width: 80, height: 60, mr:4, background:'#424B5A'}}
                    ><h3>등록</h3>
                    </Button>
                    <Button variant="contained" sx={{ width: 80, height: 60, background:'#757575' }}>
                    <h3>취소</h3>
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default FarmCreate;