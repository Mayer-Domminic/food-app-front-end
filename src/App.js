import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GoogleLoginButton from './GoogleLoginButton';
import OAuth2Callback from './OAuth2Callback';
import Pantry from './Pantry';
import CreateFood from './CreateFood';
import Search from './Search';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Food Search</h1>
        </header>
        <Routes>
          <Route path="/" element={<GoogleLoginButton />} />
          <Route path="/oauth2callback" element={<OAuth2Callback />} />
          <Route path="/home" element={<Pantry />} />
          <Route path="/create-food" element={<CreateFood />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
