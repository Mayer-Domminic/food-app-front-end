import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OAuth2Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const fetchTokens = async () => {
      try {
        const response = await axios.post('http://localhost:5000/oauth2callback', { code });
        if (response.status === 200) {
          navigate('/home');
        }
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    };

    if (code) {
      fetchTokens();
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuth2Callback;
