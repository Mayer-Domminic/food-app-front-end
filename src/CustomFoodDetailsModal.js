import React, { useState } from 'react';
import axios from 'axios';
import './FoodDetailsModal.css';

const CustomFoodDetailsModal = ({ item, closeModal }) => {
  const [ingredients, setIngredients] = useState(item.ingredients.join(', '));

  const updateIngredients = async () => {
    try {
      const updatedIngredients = ingredients.split(',').map(ingredient => ingredient.trim());
      await axios.post('http://localhost:5000/update_custom_food_ingredients', {
        item: item,
        ingredients: updatedIngredients,
      }, { withCredentials: true });
      closeModal();
    } catch (error) {
      console.error('Error updating ingredients:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{item.description}</h3>
        <p><strong>Category:</strong> {item.foodCategory || 'N/A'}</p>
        <p><strong>Serving Size:</strong> {item.serving_size} {item.serving_sizeUnit}</p>
        <p><strong>Ingredients:</strong></p>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients, separated by commas"
          rows="4"
          cols="50"
        />
        <button onClick={updateIngredients}>Update Ingredients</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default CustomFoodDetailsModal;
