import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pantry.css'; // Ensure the card CSS is imported
import GoogleLoginButton from './GoogleLoginButton';
import { AuthContext } from './AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="landing-container">
      <h1>Welcome to Food Search</h1>
      {user ? (
        <div className="pantry-grid">
          <div className="pantry-card" onClick={() => navigate('/recipes')}>
            <h3>Recipes</h3>
          </div>
          <div className="pantry-card" onClick={() => navigate('/foods')}>
            <h3>Foods</h3>
          </div>
          <div className="pantry-card" onClick={() => navigate('/home')}>
            <h3>Pantry</h3>
          </div>
        </div>
      ) : (
        <GoogleLoginButton />
      )}
    </div>
  );
};

export default LandingPage;
