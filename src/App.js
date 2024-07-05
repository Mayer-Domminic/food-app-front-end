import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import Search from './Search';
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import Pantry from './Pantry';
import CreateFood from './CreateFood';
import { AuthProvider, AuthContext } from './AuthContext';
import axios from 'axios';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return user ? <Component {...rest} /> : <Navigate to="/" />;
};

function AppContent() {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/current_user', { withCredentials: true });
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    checkCurrentUser();
  }, [setUser]);

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/home"><h1>Food Search</h1></Link>
      </header>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search addItemToPantry={() => {}} />} />
        <Route path="/home" element={<ProtectedRoute element={Pantry} />} />
        <Route path="/create-food" element={<CreateFood />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
