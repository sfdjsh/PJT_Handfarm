import './App.css';
import logo from './HandFarm.png';
import {Button} from "@mui/material"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Login from "./pages/auth/Login";
import GlobalStyle from "./style/GlobalStyle";
import Footer from "./components/common/Footer";
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ArticleForm from "./pages/community/ArticleForm";
import CommunityMain from "./pages/community/CommunityMain"

//
// export const Wrapper = styled.div`
//   height : auto;
//   min-height: 100%;
// `

function App() {
  return (
    <>
      <GlobalStyle />
          <Router>
            <Routes>
              <Route exact path='/' element={<Login/>} />
              <Route exact path='/community' element={<CommunityMain />}></Route>
              <Route exact path='/community/create' element={<ArticleForm/>} />
            </Routes>
            <Footer/>
          </Router>
    </>
  )
};

export default App;
