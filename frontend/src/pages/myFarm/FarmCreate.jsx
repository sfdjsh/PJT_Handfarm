import { Container, Box, Divider, TextField, Button } from '@mui/material';
import React from 'react';

export const FarmCreate = () => {
    return (
        <Container>
            <Box style={{ textAlign: 'left', }}>
                <h2 style={{ marginBottom: 'auto', marginLeft: '5px' }}>내 농장 등록하기</h2>
                <Divider style={{ backgroundColor: "white" }} />

                <Container>
                    <Box>
                        <h3>기기</h3>
                        <TextField variant="outlined" label="기기를 등록해주세요." fullWidth style={{ color: 'white' }} />
                    </Box>
                    <Box>
                        <h3>농장 이름</h3>
                        <TextField variant="outlined" label="농장 이름을 등록해주세요." fullWidth style={{ color: 'white' }} />
                    </Box>
                    <Box>
                        <h3>작물</h3>
                        <TextField variant="outlined" label="작물을 등록해주세요." fullWidth style={{ color: 'white' }} />
                    </Box>
                </Container>

                <Box style={
                    { display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                    <Button variant="contained" sx={{ width: 80, height: 60, mr:2, background:'#424B5A'}}
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