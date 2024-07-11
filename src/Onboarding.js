import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [formData, setFormData] = useState({
    birthday: '',
    height: '',
    weight: '',
    gender: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Onboarding component mounted");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/onboarding', formData, { withCredentials: true });
      navigate('/home');
    } catch (error) {
      console.error('Error during onboarding:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Birthday:
        <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
      </label>
      <label>
        Height (cm):
        <input type="number" name="height" value={formData.height} onChange={handleChange} required />
      </label>
      <label>
        Weight (kg):
        <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
      </label>
      <label>
        Gender:
        <input type="text" name="gender" value={formData.gender} onChange={handleChange} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Onboarding;
