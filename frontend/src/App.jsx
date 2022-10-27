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

//
// export const Wrapper = styled.div`
//   height : auto;
//   min-height: 100%;
// `

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
            </Routes>
            <Footer/>
          </Router>
        <Footer/>
    </>
  )
};

export default App;
