// AuthContext.js
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

  const loginWithGoogle = async (credential) => {
    try {
      const response = await axios.post('http://localhost:5000/login_with_google', { credential }, { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
