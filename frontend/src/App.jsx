import "./App.css";
import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Kakao from "./pages/auth/Kakao";
import GlobalStyle from "./style/GlobalStyle";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ArticleForm from "./pages/community/ArticleForm";
import FarmmunityMain from "./pages/community/FarmmunityMain";
import FarmRegisting from "./pages/myFarm/FarmRegisting";
import FarmCreate from "./pages/myFarm/FarmCreate";
import MyFarm from "./pages/myFarm/MyFarm";
// import Mqtt from "./mqtt/Mqtt"
import SensorDetail from "./pages/myFarm/SensorDetail"
import ControlDetail from "./pages/myFarm/ControlDetail";
import CommunityInfo from "./pages/community/CommunityInfo";
import CommunityRegion from "./pages/community/CommunityRegion";
import { useLocation } from 'react-router-dom';
import {useEffect} from "react";
import FarmmunityInfoDetail from "./pages/community/FarmmunityInfoDetail";
import Box from "@mui/material/Box";
import CommentForm from "./components/common/CommentForm";

// scrollbar.init(document.querySelector('#smooth-scroll'))
import MyPage from "./pages/myPage/MyPage"

function App() {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
    console.log(location.pathname.split('/'))
    console.log(typeof parseInt(location.pathname.split('/')[3]))
  }, [ location ])

  return (
    <>
      <GlobalStyle />
      <Box sx={{ display : "flex", flexDirection : "column", height : "100vh" }}>
       <Box sx={{ flex : 1 }}>
        <Header />
        {/* <Navbar/> */}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/community" element={<FarmmunityMain />}></Route>
          <Route exact path="/community/create" element={<ArticleForm />} />
           {/* <Route exact path='/mqtt' element={<Mqtt/>} /> */}
            <Route exact path="/community/info" element={<CommunityInfo/>} />
            <Route exact path="/community/region" element={<CommunityRegion/>} />
          <Route exact path="/community/info/:id"  element={<FarmmunityInfoDetail/>} />
          <Route
            exact
            path="/myfarm/registing"
            element={<FarmRegisting />}
          ></Route>
          <Route exact path="/myfarm/create" element={<FarmCreate />}></Route>
          <Route exact path="/kakao" element={<Kakao />}></Route>
          <Route exact path="/myfarm" element={<MyFarm />}></Route>
          <Route exact path="/sensor/detail" element={<SensorDetail />}></Route>
          <Route exact path="/control/detail" element={<ControlDetail />}></Route>
          <Route exact path="/mypage" element={<MyPage />}></Route>
        </Routes>
       </Box>
        { location.pathname === '/' || (location.pathname.split('/')[2] === 'info' && parseInt(location.pathname.split('/')[3]) >= 1 )? (<CommentForm/>) : (<Footer />) }
      </Box>
    </>
  );
}

export default App;
