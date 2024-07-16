import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pantry.css';
import { useNavigate } from 'react-router-dom';
import CustomFoodDetailsModal from './CustomFoodDetailsModal';
import AddCustomItem from './AddCustomItem';

const Foods = () => {
  const [user, setUser] = useState(null);
  const [foods, setFoods] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
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
    setShowDetailsModal(true);
  };

  const handleAddFood = (newFood) => {
    setFoods([...foods, newFood]);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedItem(null);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
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
        <div className="pantry-card add-card" onClick={() => setShowAddModal(true)}>
          <h3>+</h3>
        </div>
      </div>
      {showDetailsModal && selectedItem && (
        <div className="modal-overlay">
          <CustomFoodDetailsModal
            item={selectedItem}
            closeModal={closeDetailsModal}
          />
        </div>
      )}
      {showAddModal && (
        <div className="modal-overlay">
          <AddCustomItem
            closeModal={closeAddModal}
            onAdd={handleAddFood}
          />
        </div>
      )}
    </div>
  );
};

export default Foods;
