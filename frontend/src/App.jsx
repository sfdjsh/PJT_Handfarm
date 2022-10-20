import './App.css';
import logo from './HandFarm.png';
// import {Button} from "@mui/material"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className='App-logo' src={ logo } alt="HandFarm" />
        <div>
          <p>원격으로 농장 관리와,</p>
          <p>커뮤니티 기능으로,</p>
          <p>나의 농장을 관리해보세요!</p>
        </div>
      </header>
      {/* <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button> */}
    </div>
  )
};

export default App;
