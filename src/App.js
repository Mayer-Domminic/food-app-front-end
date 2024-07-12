import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import OAuth2Callback from './OAuth2Callback';
import Pantry from './Pantry';
import CreateFood from './CreateFood';
import Search from './Search';
import Onboarding from './Onboarding';
import Header from './Header';
import Profile from './Profile';
import LandingPage from './LandingPage';
import Foods from './Foods';
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
            <Route path="/" element={<LandingPage />} />
            <Route path="/oauth2callback" element={<OAuth2Callback />} />
            <Route path="/onboarding" element={<ProtectedRoute element={Onboarding} />} />
            <Route path="/home" element={<ProtectedRoute element={Pantry} />} />
            <Route path="/create-food" element={<ProtectedRoute element={CreateFood} />} />
            <Route path="/search" element={<ProtectedRoute element={Search} />} />
            <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
            <Route path="/foods" element={<ProtectedRoute element={Foods} />} />
            <Route path="/recipes" element={<ProtectedRoute element={() => <div>Recipes Page</div>} />} /> {/* Placeholder for Recipes */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
