import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/current_user', { withCredentials: true });
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Birthday: {user.birthday}</p>
      <p>Height: {user.height} cm</p>
      <p>Weight: {user.weight} kg</p>
      <p>Gender: {user.gender}</p>
    </div>
  );
};

export default Profile;
