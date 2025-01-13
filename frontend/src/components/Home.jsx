import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Home.css'; 
const Home = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(process.env.REACT_APP_BASE_URL);
    navigate(`/repos/${username}`);
  };

  return (
    <div className="home-container">
      <input
        type="text"
        className="home-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button className="home-button" onClick={handleSubmit}>
        Search
      </button>
      <br></br>
      <i>Username is case sensitive</i>
    </div>
  );
};

export default Home;
