import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pantry.css';
import { useNavigate } from 'react-router-dom';
import AddItemModal from './AddItemModal';
import FoodDetailsModal from './FoodDetailsModal';

const Pantry = () => {
  const [user, setUser] = useState(null);
  const [pantryItems, setPantryItems] = useState([]);
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

    const fetchPantryItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pantry', { withCredentials: true });
        setPantryItems(response.data);
      } catch (error) {
        console.error('Error fetching pantry items:', error);
      }
    };

    fetchUser();
    fetchPantryItems();
  }, []);

  const handleSearch = (params) => {
    navigate('/search', { state: { ...params } });
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const calculateDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
  };

  const getPerishMeterColor = (daysLeft) => {
    if (daysLeft > 7) return 'green';
    if (daysLeft > 3) return 'yellow';
    return 'red';
  };

  const incrementQuantity = async (item) => {
    try {
      await axios.post('http://localhost:5000/update_quantity', {
        item: item.item,
        increment: true,
      }, { withCredentials: true });
      setPantryItems(pantryItems.map(p => 
        p.item.fdcId === item.item.fdcId ? { ...p, quantity: p.quantity + 1 } : p
      ));
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  };

  const decrementQuantity = async (item) => {
    try {
      await axios.post('http://localhost:5000/update_quantity', {
        item: item.item,
        increment: false,
      }, { withCredentials: true });
      setPantryItems(pantryItems.map(p => 
        p.item.fdcId === item.item.fdcId ? { ...p, quantity: p.quantity - 1 } : p
      ));
    } catch (error) {
      console.error('Error decrementing quantity:', error);
    }
  };

  const removeItem = async (item) => {
    try {
      await axios.post('http://localhost:5000/remove_item', {
        item: item.item,
      }, { withCredentials: true });
      setPantryItems(pantryItems.filter(p => p.item.fdcId !== item.item.fdcId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleAddToPantry = async (item, quantity, expiryDate, measure) => {
    if (user && user.email) {
      try {
        await axios.post('http://localhost:5000/add_to_pantry', {
          item: { ...item, selectedMeasure: measure },
          quantity,
          expiryDate,
          measure
        }, { withCredentials: true });
        setPantryItems([...pantryItems, { item: { ...item, selectedMeasure: measure }, quantity, expiryDate, measure }]);
        closeModal();
      } catch (error) {
        console.error('Error adding item to pantry:', error);
      }
    }
  };

  return (
    <div className="pantry-container">
      <h2>{user ? `${user.username}'s Pantry` : 'Loading...'}</h2>
      <div className="pantry-grid">
        {pantryItems.map((p, index) => (
          <div key={index} className="pantry-card" onClick={() => handleItemClick(p)}>
            <h3>{p.item.description}</h3>
            <p>Quantity: {p.quantity}</p>
            <p>Expiry Date: {p.expiryDate}</p>
            <p>Days Left: {calculateDaysLeft(p.expiryDate)}</p>
            <div className="perish-meter">
              <div
                className="perish-meter-bar"
                style={{
                  width: `${Math.min(100, (calculateDaysLeft(p.expiryDate) / 30) * 100)}%`,
                  backgroundColor: getPerishMeterColor(calculateDaysLeft(p.expiryDate)),
                }}
              ></div>
            </div>
            <div className="quantity-controls">
              <button onClick={(e) => { e.stopPropagation(); incrementQuantity(p); }}>+</button>
              <button onClick={(e) => { e.stopPropagation(); decrementQuantity(p); }} disabled={p.quantity <= 1}>-</button>
              <button onClick={(e) => { e.stopPropagation(); removeItem(p); }}>Remove</button>
            </div>
          </div>
        ))}
        <div className="pantry-card add-card" onClick={() => setShowModal(true)}>
          <h3>+</h3>
        </div>
      </div>
      <div className="user-info">
        {user && <p>Logged in as: {user.email}</p>}
      </div>
      {showModal && selectedItem && (
        <div className="modal-overlay">
          <FoodDetailsModal
            item={selectedItem}
            closeModal={closeModal}
          />
        </div>
      )}
      {showModal && !selectedItem && (
        <div className="modal-overlay">
          <AddItemModal
            closeModal={closeModal}
            onSearch={handleSearch}
          />
        </div>
      )}
    </div>
  );
};

export default Pantry;
