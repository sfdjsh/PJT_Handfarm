import "./App.css";
import React from "react";
// import scrollbar from 'smooth-scrollbar'
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

// scrollbar.init(document.querySelector('#smooth-scroll'))

function App() {
  return (
    <>
      <GlobalStyle />
      {/* <Header /> */}
      <Router>
        {/* <Navbar/> */}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/community" element={<FarmmunityMain />}></Route>
          <Route exact path="/community/create" element={<ArticleForm />} />
           {/* <Route exact path='/mqtt' element={<Mqtt/>} /> */}
            <Route exact path="/community/info" element={<CommunityInfo/>} />
            <Route exact path="/community/region" element={<CommunityRegion/>} />
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
        </Routes>
         {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
