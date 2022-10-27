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
import Navbar from "./components/common/Navbar";
import FarmmunityMain from "./pages/community/FarmmunityMain";
import Mqtt from "./mqtt/Mqtt";
// import Mqtt2 from "./mqtt/Mqtt2";
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
              <Navbar/>
            <Routes>
              <Route exact path='/' element={<Login/>} />
              <Route exact path='/community' element={<FarmmunityMain />}></Route>
              <Route exact path='/community/create' element={<ArticleForm/>} />
                <Route exact path='/mqtt' element={<Mqtt/>} />
            </Routes>
            <Footer/>
          </Router>
    </>
  )
};

export default App;
