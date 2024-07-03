import React, { useState } from 'react';
import './QuantityModal.css';

const QuantityModal = ({ item, closeModal, onAddToPantry }) => {
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [selectedMeasure, setSelectedMeasure] = useState(item.foodMeasures ? JSON.stringify(item.foodMeasures[0]) : null);

  const handleAdd = () => {
    if (quantity && expiryDate) {
      const measure = selectedMeasure ? JSON.parse(selectedMeasure).disseminationText : item.servingSizeUnit;
      const measureWeight = selectedMeasure ? JSON.parse(selectedMeasure).gramWeight : item.servingSize;
      onAddToPantry(item, quantity, expiryDate, `${measure} (${measureWeight}g)`);
      console.log(measure, measureWeight)
      closeModal();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add {item.description} to Pantry</h3>
        {item.foodMeasures && (
          <select value={selectedMeasure} onChange={(e) => setSelectedMeasure(e.target.value)}>
            {item.foodMeasures.map((measure, index) => (
              <option key={index} value={JSON.stringify(measure)}>
                {measure.disseminationText} ({measure.gramWeight} g)
              </option>
            ))}
          </select>
        )}
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder={`Quantity (${selectedMeasure ? JSON.parse(selectedMeasure).disseminationText : item.servingSizeUnit})`}
        />
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="Expiry Date"
        />
        <button onClick={handleAdd}>Add to Pantry</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default QuantityModal;
