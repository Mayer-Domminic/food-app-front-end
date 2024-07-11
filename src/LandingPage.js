import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const LandingPage = () => {
  const navigate = useNavigate();

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
    <div>
      <h1>Welcome to Food Search</h1>
      <GoogleOAuthProvider clientId="420246684928-ldrj45h3gqjln6gn3t5oq42legg9ig41.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default LandingPage;
