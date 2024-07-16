import React, { useState } from 'react';
import axios from 'axios';
import './FoodDetailsModal.css';

const AddCustomItemModal = ({ closeModal, onAdd }) => {
  const [description, setDescription] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [quantityPerUnit, setQuantityPerUnit] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleAdd = async () => {
    try {
      const newItem = {
        description,
        serving_size: servingSize,
        quantity_per_unit: quantityPerUnit,
        foodNutrients: [
          { name: 'calories', value: calories, unit: 'kcal' },
          { name: 'protein', value: protein, unit: 'g' },
          { name: 'fat', value: fat, unit: 'g' },
        ],
        ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
        dataType: 'Custom',
      };
      await axios.post('http://localhost:5000/add_custom_food', newItem, { withCredentials: true });
      onAdd(newItem);
      closeModal();
    } catch (error) {
      console.error('Error adding custom food:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Custom Food</h3>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Serving Size"
          value={servingSize}
          onChange={(e) => setServingSize(e.target.value)}
        />
        <input
          type="text"
          placeholder="Quantity Per Unit"
          value={quantityPerUnit}
          onChange={(e) => setQuantityPerUnit(e.target.value)}
        />
        <input
          type="text"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <input
          type="text"
          placeholder="Protein"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
        />
        <input
          type="text"
          placeholder="Fat"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
        />
        <textarea
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows="4"
        />
        <button onClick={handleAdd}>Add Food</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default AddCustomItemModal;
