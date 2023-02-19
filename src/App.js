import './App.css';
import {Route, Routes ,BrowserRouter, Switch,Outlet,Navigate} from 'react-router-dom';
import Navi from "./pages/Nav/Navi";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Login/Register";
import Edit from "./pages/Edit/Edit";
function App() {
  const isAuth = true;
  return (
    
    <BrowserRouter >
      
      <Navi />
      
      <div>
       
      <Routes>
      <Route path="/" element={ <Home/> }/>
      <Route path="/edit/:id" element={ <Edit/> }/>
      {/* <Route exact path="/register"  render={() => (isAuth ? <Navigate to="/" /> : <Register />)} /> */}
      {/* <Route exact path="/register" element ={<Register/>}> */}

      </Routes>
      
      </div>
</BrowserRouter>
  );
}



export default App;
