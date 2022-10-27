import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Login from "./pages/auth/Login";
import GlobalStyle from "./style/GlobalStyle";
import Header from "./components/common/Header"
import Footer from "./components/common/Footer";
import ArticleForm from "./pages/community/ArticleForm";
import CommunityMain from "./pages/community/CommunityMain"
import FarmRegisting from './pages/myFarm/FarmRegisting';
import FarmCreate from './pages/myFarm/FarmCreate';
import Kakao from './pages/auth/Kakao'

function App() {
  return (
    <>
      <GlobalStyle />
        <Header />
          <Router>
              <Navbar/>
            <Routes>
              <Route exact path='/' element={<Login/>} />
              <Route exact path='/community' element={<FarmmunityMain />}></Route>
              <Route exact path='/community/create' element={<ArticleForm/>} />
                <Route exact path='/mqtt' element={<Mqtt/>} />
              <Route exact path='/myfarm/registing' element={<FarmRegisting />}></Route>
              <Route exact path='/myfarm/create' element={<FarmCreate />}></Route>
              <Route exact path='/kakao' element={<Kakao />}></Route>
            </Routes>
            <Footer/>
          </Router>
    </>
  )
};

export default App;
