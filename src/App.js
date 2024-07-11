import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import GoogleLoginButton from './GoogleLoginButton';
import OAuth2Callback from './OAuth2Callback';
import Pantry from './Pantry';
import CreateFood from './CreateFood';
import Search from './Search';
import Onboarding from './Onboarding';
import Header from './Header';
import Profile from './Profile';
import { AuthProvider, AuthContext } from './AuthContext';

function ProtectedRoute({ element: Component, ...rest }) {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!user.birthday || !user.height || !user.weight || !user.gender) {
    return <Navigate to="/onboarding" />;
  }

  return <Component {...rest} />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<GoogleLoginButton />} />
            <Route path="/oauth2callback" element={<OAuth2Callback />} />
            <Route path="/onboarding" element={<ProtectedRoute element={Onboarding} />} />
            <Route path="/home" element={<ProtectedRoute element={Pantry} />} />
            <Route path="/create-food" element={<ProtectedRoute element={CreateFood} />} />
            <Route path="/search" element={<ProtectedRoute element={Search} />} />
            <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
