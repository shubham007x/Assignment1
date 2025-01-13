import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/RepoDetails.css"; // Import the CSS for styling

const RepoDetails = () => {
  const { username, repoName } = useParams(); // Extract username and repoName from the URL
  const [repoDetails, setRepoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        // Fetch details of the selected repository
        const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
        setRepoDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repository details:", error);
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [username, repoName]);

  if (loading) return <p>Loading repository details...</p>;

  return (
    <div className="repo-details-container">
      {repoDetails ? (
        <>
          <div className="repo-header">
            {/* Repository Image (owner's avatar as a placeholder for now) */}
            <img
              className="repo-image"
              src={repoDetails.owner.avatar_url}
              alt={`${repoDetails.name} logo`}
            />
            <div className="repo-description">
              <h1>{repoDetails.name}</h1>
              <p>{repoDetails.description || "No description available"}</p>
              <p>
                <strong>Full Name:</strong> {repoDetails.full_name}
              </p>
              <p>
                <strong>Language:</strong> {repoDetails.language || "Not specified"}
              </p>
              <p>
                🌟 {repoDetails.stargazers_count} | 🍴 {repoDetails.forks_count} | 👁️ {repoDetails.watchers_count}
              </p>
              <p>
                <strong>Created At:</strong> {new Date(repoDetails.created_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Last Updated:</strong> {new Date(repoDetails.updated_at).toLocaleDateString()}
              </p>
              <p>
                <a href={repoDetails.html_url} target="_blank" rel="noopener noreferrer">
                  Visit Repository on GitHub
                </a>
              </p>
            </div>
          </div>
          <button onClick={() => navigate(`/repos/${username}`)}>Back to Repositories</button>
        </>
      ) : (
        <p>Repository details not found.</p>
      )}
    </div>
  );
};

export default RepoDetails;
