import React, { useState } from 'react';
import './CreateFood.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateFood = () => {
  const [name, setName] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [quantityPerUnit, setQuantityPerUnit] = useState('');
  const [mandatoryNutrients, setMandatoryNutrients] = useState({
    calories: '',
    protein: '',
    fat: ''
  });
  const [optionalNutrients, setOptionalNutrients] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [expiryDate, setExpiryDate] = useState('');
  const navigate = useNavigate();

  const handleAddOptionalNutrient = () => {
    setOptionalNutrients([...optionalNutrients, { name: '', value: '', unit: '' }]);
  };

  const handleOptionalNutrientChange = (index, field, value) => {
    const newNutrients = [...optionalNutrients];
    newNutrients[index][field] = value;
    setOptionalNutrients(newNutrients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleSubmit = async () => {
    const newItem = {
      name,
      servingSize,
      quantityPerUnit,
      mandatoryNutrients,
      optionalNutrients,
      ingredients,
      expiryDate
    };

    try {
      const response = await axios.post('http://localhost:5000/create_new_food', newItem, { withCredentials: true });
      navigate('/home', { state: { newItem: response.data.food_item } });
    } catch (error) {
      console.error('Error creating custom food item:', error);
    }
  };

  return (
    <div className="create-food-container">
      <h2>Create New Food Item</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Serving Size:
        <input type="text" value={servingSize} onChange={(e) => setServingSize(e.target.value)} />
      </label>
      <label>
        Quantity Per Unit:
        <input type="text" value={quantityPerUnit} onChange={(e) => setQuantityPerUnit(e.target.value)} />
      </label>
      <div className="mandatory-nutrients">
        <h3>Mandatory Nutrients</h3>
        <label>
          Calories:
          <input type="text" value={mandatoryNutrients.calories} onChange={(e) => setMandatoryNutrients({ ...mandatoryNutrients, calories: e.target.value })} />
        </label>
        <label>
          Protein:
          <input type="text" value={mandatoryNutrients.protein} onChange={(e) => setMandatoryNutrients({ ...mandatoryNutrients, protein: e.target.value })} />
        </label>
        <label>
          Fat:
          <input type="text" value={mandatoryNutrients.fat} onChange={(e) => setMandatoryNutrients({ ...mandatoryNutrients, fat: e.target.value })} />
        </label>
      </div>
      <div className="optional-nutrients">
        <h3>Optional Nutrients</h3>
        <button onClick={handleAddOptionalNutrient}>Add Optional Nutrient</button>
        {optionalNutrients.map((nutrient, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Name"
              value={nutrient.name}
              onChange={(e) => handleOptionalNutrientChange(index, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Value"
              value={nutrient.value}
              onChange={(e) => handleOptionalNutrientChange(index, 'value', e.target.value)}
            />
            <input
              type="text"
              placeholder="Unit"
              value={nutrient.unit}
              onChange={(e) => handleOptionalNutrientChange(index, 'unit', e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="ingredients">
        <h3>Ingredients</h3>
        <button onClick={handleAddIngredient}>Add Ingredient</button>
        {ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
            placeholder="Ingredient"
          />
        ))}
      </div>
      <label>
        Expiry Date:
        <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
      </label>
      <button onClick={handleSubmit}>Create Food Item</button>
    </div>
  );
};

export default CreateFood;
