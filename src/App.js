import { useContext } from 'react';
import './App.css';
import Container from './Components/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { KenContext } from './Context/KenContext';
import logo from './logo.png'
function App() {
    const { isShow } = useContext(KenContext);
  return (
      <div className="App">
          <div>
              <img src={logo} className='logo' alt='logo'/>
          </div>
          {isShow && <div className="overlay">
              <div className="loader"><CircularProgress /></div>
          </div>}
        <Container/>
    </div>
  );
}

export default App;
