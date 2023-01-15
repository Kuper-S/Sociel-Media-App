import './App.css';
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import Navi from "./pages/Nav/Navi";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
    
      <Navi />
      <Routes>
     
    </Routes>
  
  </BrowserRouter>
  );
}

export default App;
