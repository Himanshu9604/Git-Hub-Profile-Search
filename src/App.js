import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      const userData = await userResponse.json();

      const repoResponse = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const reposData = await repoResponse.json();
      setUser(userData);
      setRepositories(reposData);
    } catch (error) {
      console.log(`Error`, error);
    }
  };

  return (
    <div className="container">
      <h1>GitHub Profile Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="Enter a GitHub username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>
      {user && (
        <div className="user-profile">
          <h2>{user.name}</h2>
          <img src={user.avatar_url} alt="Avatar" />
          <p>{user.bio}</p>
        </div>
      )}
      {repositories.length > 0 && (
        <div className="repositories">
          <h3>Repositories</h3>
          <ul>
            {repositories.map((repos) => (
              <li key={repos.id}>
                <a
                  href={repos.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repos.name}
                </a>
                <p>{repos.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
