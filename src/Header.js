import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { AuthContext } from './AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <h1 onClick={() => navigate('/')}>Food Search</h1>
      {user && (
        <nav>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/home')}>Pantry</button>
          <button onClick={() => navigate('/profile')}>Profile</button>
          <button onClick={() => navigate('/foods')}>Foods</button>
          <button onClick={() => navigate('/recipes')}>Recipes</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      )}
    </header>
  );
};

export default Header;
