import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const LandingPage = () => {
  return (
    <div className="container">
      <h2>Welcome to the Food Search App</h2>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default LandingPage;
