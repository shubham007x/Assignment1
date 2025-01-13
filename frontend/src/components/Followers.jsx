import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Followers.css'; // Import the CSS file for styling

const Followers = () => {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        // Fetch mutual followers from your backend
        const response = await axios.post(`http://localhost:8000/users/${username}/friends`);
        setFollowers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching followers:', error);
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [username]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="followers-container">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <h1>Followers of {username}</h1>
      <ul className="followers-list">
        {followers.map((follower) => (
          <li key={follower} className="follower-item" onClick={() => navigate(`/repos/${follower}`)}>
            {follower}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Followers;
