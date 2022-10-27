import React from 'react'
import { Container, Fab, Box } from '@mui/material'
import { height } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';

const FarmRegisting = () => {
  return (
    <Container>
      <Box sx={{
        backgroundColor: "black",
        width: 300,
        height: 400,
        mt: 10
      }}>
        <div>
          <h3 style={{ marginTop: '50px' }}>안녕하세요. 정석호님!</h3>
          <h3>핸드팜에 오신걸 환영합니다.</h3>
        </div>
        <Box sx={{ mt: 10 }}>
          <Fab size="medium">
            <AddIcon />
          </Fab>
          <h4>내 농장 등록하기</h4>
        </Box>
      </Box>
    </Container>
  )
}

export default FarmRegisting;