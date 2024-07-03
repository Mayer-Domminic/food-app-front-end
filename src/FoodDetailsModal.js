import React from 'react';
import './FoodDetailsModal.css';

const FoodDetailsModal = ({ item, closeModal }) => {
  if (!item) return null;

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

  const renderNutritionFacts = (nutrients) => {
    const relevantNutrients = ['Energy', 'Protein', 'Total lipid (fat)', 'Carbohydrate, by difference', 'Sugars, total', 'Fiber, total dietary', 'Sodium, Na'];

    return nutrients
      .filter((nutrient) => relevantNutrients.includes(nutrient.nutrientName))
      .map((nutrient, index) => (
        <li key={index}>
          <span>{nutrient.nutrientName}</span>
          <span>{nutrient.value} {nutrient.unitName}</span>
        </li>
      ));
  };

  const renderIngredients = (finalFoodInputFoods) => {
    return finalFoodInputFoods.map((food, index) => (
      <li key={index}>
        <span>{food.foodDescription}</span>
      </li>
    ));
  };

  const daysLeft = calculateDaysLeft(item.expiryDate);

  return (
    <div className="modal-content">
      <h3>{item.item.description}</h3>
      {item.item.dataType === 'Branded' ? (
        <>
          <p><strong>Brand:</strong> {item.item.brandName || 'N/A'}</p>
        </>
      ) : null}
      <p><strong>Category:</strong> {item.item.foodCategory || 'N/A'}</p>
      <p><strong>Serving Size:</strong> {item.measure || `${item.item.servingSize} ${item.item.servingSizeUnit}`}</p>
      <p><strong>Ingredients:</strong></p>
      {item.item.finalFoodInputFoods ? (
        <ul>
          {renderIngredients(item.item.finalFoodInputFoods)}
        </ul>
      ) : (
        <p>{item.item.ingredients || 'N/A'}</p>
      )}
      <div className="nutrition-facts">
        <h4>Nutritional Facts</h4>
        <ul>
          {renderNutritionFacts(item.item.foodNutrients)}
        </ul>
      </div>
      <p><strong>Expiry Date:</strong> {item.expiryDate}</p>
      <p><strong>Days Left:</strong> {isNaN(daysLeft) ? 'N/A' : daysLeft}</p>
      <div className="perish-meter">
        <div
          className="perish-meter-bar"
          style={{
            width: `${Math.min(100, (daysLeft / 30) * 100)}%`,
            backgroundColor: getPerishMeterColor(daysLeft),
          }}
        ></div>
      </div>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default FoodDetailsModal;