import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useSelector } from 'react-redux';
import Feed from '../../components/Feed/Feed.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Login/Register.jsx';

const Home = React.memo(() => {
  // const isUserAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const user = useSelector((state) => state.auth.user);

  return (
    
    <div className="home-container">
      <h1 className="home-title">Feed</h1>
     
      <div className="home-content">
        <div className="home-left">
        {/* <Register /> */}
        <Feed  />
        </div>
        </div>
    </div>
  );
});

export default Home;
