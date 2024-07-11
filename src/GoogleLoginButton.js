import React from 'react';

const GoogleLoginButton = () => {
  const handleLogin = () => {
    const clientId = '420246684928-ldrj45h3gqjln6gn3t5oq42legg9ig41.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:3000/oauth2callback';
    const scope = 'profile email';
    const responseType = 'code';
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

    window.location.href = authUrl;
  };

  return (
    <button onClick={handleLogin}>
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
