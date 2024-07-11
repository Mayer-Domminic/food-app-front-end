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
  const [quantity, setQuantity] = useState('');
  const [cost, setCost] = useState('');
  const [step, setStep] = useState(1); // New state to handle step
  const [createdItem, setCreatedItem] = useState(null); // New state to store created item
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

  const handleCreateFood = async () => {
    const newItem = {
      description: name,
      serving_size: servingSize,
      quantity_per_unit: quantityPerUnit,
      foodNutrients: [
        { name: 'calories', value: mandatoryNutrients.calories, unit: 'kcal' },
        { name: 'protein', value: mandatoryNutrients.protein, unit: 'g' },
        { name: 'fat', value: mandatoryNutrients.fat, unit: 'g' }
      ],
      optionalNutrients,
      ingredients
    };

    try {
      const response = await axios.post('http://localhost:5000/create_new_food', 
        newItem, 
        { withCredentials: true });
      setCreatedItem(response.data.food_item);
      setStep(2); // Move to the next step
    } catch (error) {
      console.error('Error creating custom food item:', error);
    }
  };

  const handleAddToPantry = async () => {
    try {
      await axios.post('http://localhost:5000/add_to_pantry', {
        item: createdItem,
        quantity,
        expiryDate,
        cost
      }, { withCredentials: true });
      navigate('/home');
    } catch (error) {
      console.error('Error adding item to pantry:', error);
    }
  };

  if (step === 1) {
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
        <button onClick={handleCreateFood}>Create Food Item</button>
      </div>
    );
  }

  return (
    <div className="create-food-container">
      <h2>Add {createdItem.description} to Pantry</h2>
      <label>
        Quantity:
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </label>
      <label>
        Expiry Date:
        <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
      </label>
      <label>
        Cost:
        <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
      </label>
      <button onClick={handleAddToPantry}>Add to Pantry</button>
    </div>
  );
};

export default CreateFood;
