import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/current_user', { withCredentials: true });
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      await axios.post('http://localhost:5000/login', { email, password }, { withCredentials: true });
      const response = await axios.get('http://localhost:5000/current_user', { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
