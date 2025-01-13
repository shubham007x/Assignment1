import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/RepoList.css'; // Make sure to import the CSS file

const RepoList = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Call your backend to get user info from the database or GitHub
        const userResponse = await axios.post('http://localhost:8000/users', { username });
        setUser(userResponse.data);

        // Call backend to get the repositories for that user
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
        setRepos(reposResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const navigateToFollower = () => {
    navigate(`/followers/${username}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="repo-list-container">
      <div className="user-info">
        <img className="avatar" src={user.avatar_url} alt={`${user.username}'s avatar`} />
        <h2>{user.username}</h2>
        <button onClick={navigateToFollower}>Followers</button>
      </div>
      <div className="repo-grid">
        {repos.map((repo, index) => (
          <div
            key={repo.id}
            className={`repo-item ${index % 2 === 0 ? 'left' : 'right'}`}
            onClick={() => navigate(`/repo/${username}/${repo.name}`)}
          >
            <h3>{repo.name}</h3>
            <p>{repo.description ? repo.description.slice(0, 100) : 'No description available.'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoList;
