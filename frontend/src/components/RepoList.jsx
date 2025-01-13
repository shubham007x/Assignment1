import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/RepoList.css';

const RepoList = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from backend
        const userResponse = await axios.post(`https://deployments-k6oq.onrender.com/users`, { username });
        setUser(userResponse.data);

        // Fetch user repositories from GitHub API
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
        setRepos(reposResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('User not found or data could not be retrieved.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const navigateToFollower = () => {
    navigate(`/followers/${username}`);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="repo-list-container">
      {user && (
        <div className="user-info">
          <img className="avatar" src={user.avatar_url} alt={`${user.username}'s avatar`} />
          <h2>{user.username}</h2>
          <button onClick={navigateToFollower}>Followers</button>
        </div>
      )}
      <div className="repo-grid">
        {repos.length > 0 ? (
          repos.map((repo, index) => (
            <div
              key={repo.id}
              className={`repo-item ${index % 2 === 0 ? 'left' : 'right'}`}
              onClick={() => navigate(`/repo/${username}/${repo.name}`)}
            >
              <h3>{repo.name}</h3>
              <p>{repo.description ? repo.description.slice(0, 100) : 'No description available.'}</p>
            </div>
          ))
        ) : (
          <p>No repositories available for this user.</p>
        )}
      </div>
    </div>
  );
};

export default RepoList;
