import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import NewPost from '../../components/NewPost/NewPost.jsx';
import Feed from '../../components/Feed/Feed.jsx';

const Home = React.memo(() => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome you MANAIAC</h1>
     
      <div className="home-content">
        <div className="home-left">
        <Feed  />
        </div>
        </div>
    </div>
  );
});

export default Home;
