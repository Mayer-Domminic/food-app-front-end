import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pantry.css'; // Ensure the card CSS is imported
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { AuthContext } from './AuthContext';
import axios from 'axios';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      const response = await axios.post('http://localhost:5000/login_with_google', { token: credential }, { withCredentials: true });
      if (response.status === 200) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Google login error:', error.message);
    }
  };

  const handleGoogleLoginError = (error) => {
    console.error('Google login failed:', error);
  };

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
        <GoogleOAuthProvider clientId="your-client-id">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
          />
        </GoogleOAuthProvider>
      )}
    </div>
  );
};

export default LandingPage;
