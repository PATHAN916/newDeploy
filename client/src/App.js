import './App.css';

import Home from './components/Home';
import Login from './components/Login';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignUp from './components/SignUp';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/Home" element={<Home/>}></Route>
     
    </Routes>
      </BrowserRouter>
  );
}

export default App;
