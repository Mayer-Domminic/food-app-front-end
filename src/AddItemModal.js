import React, { useState } from 'react';
import './AddItemModal.css';
import { useNavigate } from 'react-router-dom';

const AddItemModal = ({ closeModal, onSearch }) => {
  const [query, setQuery] = useState('');
  const [includeAllWords, setIncludeAllWords] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [dataType, setDataType] = useState('Branded');
  const navigate = useNavigate();

  const handleSearch = () => {
    onSearch({ query, includeAllWords, pageSize, dataType });
    closeModal();
  };

  const handleCreateNewFood = () => {
    navigate('/create-food');
    closeModal();
  };

  return (
    <div className="modal-content">
      <h3>Add Item to Pantry</h3>
      <input
        type="text"
        placeholder="Search Food"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="filter-container">
        <div className="filter-group">
          <label>
            <span>All Words?</span>
            <div className="custom-checkbox">
              <input
                type="checkbox"
                checked={includeAllWords}
                onChange={(e) => setIncludeAllWords(e.target.checked)}
              />
              <span className="checkmark"></span>
            </div>
          </label>
          <label>
            <span>Page Size:</span>
            <input
              type="number"
              value={pageSize}
              onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
            />
          </label>
          <label>
            <span>Data Type:</span>
            <select value={dataType} onChange={(e) => setDataType(e.target.value)}>
              <option value="Branded">Branded</option>
              <option value="Survey (FNDDS)">Survey (FNDDS)</option>
            </select>
          </label>
        </div>
      </div>
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleCreateNewFood}>Create New Food</button>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default AddItemModal;
