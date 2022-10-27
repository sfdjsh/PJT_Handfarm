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

function App() {
  return (
    <>
      <GlobalStyle />
        <Header />
          <Router>
            <Routes>
              <Route exact path='/' element={<Login/>} />
              <Route exact path='/community' element={<CommunityMain />}></Route>
              <Route exact path='/community/create' element={<ArticleForm/>} />
              <Route exact path='/myfarm/registing' element={<FarmRegisting />}></Route>
            </Routes>
          </Router>
        <Footer />
    </>
  )
};

export default App;
