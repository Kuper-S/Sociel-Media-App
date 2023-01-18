import './App.css';
import {Route, Routes ,BrowserRouter, Switch,Outlet} from 'react-router-dom';
import Navi from "./pages/Nav/Navi";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home/Home";


function App() {
  
  return (
    
    <BrowserRouter >
      
      <Navi />
      <div>
       
      <Routes>
      <Route path="/" element={ <Home/> }>
      </Route>

      </Routes>
      
      </div>
</BrowserRouter>
  );
}



export default App;
