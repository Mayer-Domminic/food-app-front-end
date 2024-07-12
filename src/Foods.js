import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pantry.css';
import { useNavigate } from 'react-router-dom';
import FoodDetailsModal from './FoodDetailsModal';

const Foods = () => {
  const [user, setUser] = useState(null);
  const [foods, setFoods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

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

    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:5000/custom_foods', { withCredentials: true });
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchUser();
    fetchFoods();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="pantry-container">
      <h2>{user ? `${user.username}'s Foods` : 'Loading...'}</h2>
      <div className="pantry-grid">
        {foods.map((food, index) => (
          <div key={index} className="pantry-card" onClick={() => handleItemClick(food)}>
            <h3>{food.description}</h3>
            <p>Category: {food.foodCategory || 'N/A'}</p>
          </div>
        ))}
      </div>
      {showModal && selectedItem && (
        <div className="modal-overlay">
          <FoodDetailsModal
            item={selectedItem}
            closeModal={closeModal}
          />
        </div>
      )}
    </div>
  );
};

export default Foods;
