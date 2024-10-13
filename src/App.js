import './App.css';
import TopNav from './TopNav/TopNav';
import { BrowserRouter } from 'react-router-dom';
import Routerr from '../src/routes/Router';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <TopNav />
        <Routerr/>
      </div>
    </BrowserRouter>
  );
}

export default App;
