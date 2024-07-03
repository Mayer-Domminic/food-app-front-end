import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    weight: '',
    height: '',
    age: '',
    gender: ''
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="text" name="weight" placeholder="Weight" onChange={handleChange} />
      <input type="text" name="height" placeholder="Height" onChange={handleChange} />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} />
      <input type="text" name="gender" placeholder="Gender" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
