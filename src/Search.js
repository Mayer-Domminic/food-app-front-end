import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import './Search.css';
import './Pantry.css'; // Import the pantry styles
import { useNavigate, useLocation } from 'react-router-dom';
import QuantityModal from './QuantityModal';
import { AuthContext } from './AuthContext';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [query, setQuery] = useState(location.state?.query || '');
  const [includeAllWords, setIncludeAllWords] = useState(location.state?.includeAllWords || false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(location.state?.pageSize || 20);
  const [dataType, setDataType] = useState(location.state?.dataType || 'All');
  const [results, setResults] = useState({ Custom: [], Branded: [], Survey: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showQuantityModal, setShowQuantityModal] = useState(false);

  useEffect(() => {
    if (location.state?.newItem) {
      setSelectedItem(location.state.newItem);
      setShowQuantityModal(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const searchFood = useCallback(async (pageNum = pageNumber) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/search', {
        params: {
          query,
          allWords: includeAllWords,
          pageNumber: pageNum,
          pageSize,
          dataType
        },
        withCredentials: true
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  }, [query, includeAllWords, pageNumber, pageSize, dataType]);

  useEffect(() => {
    if (query) {
      searchFood();
    }
  }, [query, searchFood]);

  const handleNextPage = () => {
    const newPageNumber = pageNumber + 1;
    setPageNumber(newPageNumber);
    searchFood(newPageNumber);
  };

  const handlePreviousPage = () => {
    const newPageNumber = pageNumber > 1 ? pageNumber - 1 : 1;
    setPageNumber(newPageNumber);
    searchFood(newPageNumber);
  };

  const toggleExpand = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setShowQuantityModal(true);
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
        navigate('/home');
      } catch (error) {
        console.error('Error adding item to pantry:', error);
      }
    }
  };

  const handleCreateNewFood = () => {
    navigate('/create-food');
  };

  const renderItems = (items) => (
    items.map((item) => (
      <div key={item.fdcId || item._id} className="pantry-card" onClick={() => toggleExpand(item.fdcId || item._id)}>
        <h3>{item.description}</h3>
        {item.dataType === 'Branded' ? (
          <p>Brand: {item.brandName || 'N/A'}</p>
        ) : (
          <p>Category: {item.foodCategory || 'N/A'}</p>
        )}
        {expandedItemId === (item.fdcId || item._id) && (
          <div>
            <h4>Food Nutrients</h4>
            <ul>
              {item.foodNutrients.map((nutrient, index) => (
                <li key={index}>
                  <p>{nutrient.nutrientName || nutrient.name}: {nutrient.value} {nutrient.unitName || nutrient.unit}</p>
                </li>
              ))}
            </ul>
            <button onClick={() => handleSelectItem(item)}>Select Item</button>
          </div>
        )}
      </div>
    ))
  );

  return (
    <div className="search-container">
      <button onClick={() => navigate('/home')} className="home-button">Home</button>
      <input
        type="text"
        placeholder="Search Food"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <div className="filter-container">
        <label className="filter-label">
          <input
            type="checkbox"
            checked={includeAllWords}
            onChange={(e) => setIncludeAllWords(e.target.checked)}
            className="filter-checkbox"
          />
          Include All Words
        </label>
        <label className="filter-label">
          Page Size:
          <input
            type="number"
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
            className="filter-input"
          />
        </label>
        <label className="filter-label">
          Data Type:
          <select value={dataType} onChange={(e) => setDataType(e.target.value)} className="filter-select">
            <option value="All">All</option>
            <option value="Branded">Branded</option>
            <option value="Survey (FNDDS)">Survey</option>
            <option value="Custom">Custom</option>
          </select>
        </label>
      </div>
      <button onClick={() => searchFood(1)} className="search-button">Search</button>
      <button onClick={handleCreateNewFood} className="create-food-button">Create New Food</button>
      <div className="results-container">
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : (
          Object.keys(results).length > 0 ? (
            <>
              <h2>Custom Items</h2>
              {results.Custom.length > 0 ? (
                <div className="pantry-grid">{renderItems(results.Custom)}</div>
              ) : (
                <p>No search results</p>
              )}
              <h2>Branded Items</h2>
              {results.Branded.length > 0 ? (
                <div className="pantry-grid">{renderItems(results.Branded)}</div>
              ) : (
                <p>No search results</p>
              )}
              <h2>Survey Items</h2>
              {results.Survey.length > 0 ? (
                <div className="pantry-grid">{renderItems(results.Survey)}</div>
              ) : (
                <p>No search results</p>
              )}
            </>
          ) : (
            <p>No results found</p>
          )
        )}
      </div>
      {Object.keys(results).length > 0 && (
        <div className="pagination-container">
          <p>Current Page: {pageNumber}</p>
          <button onClick={handlePreviousPage} className="pagination-button" disabled={pageNumber === 1}>Previous</button>
          <button onClick={handleNextPage} className="pagination-button">Next</button>
        </div>
      )}
      {showQuantityModal && selectedItem && (
        <QuantityModal
          item={selectedItem}
          closeModal={() => setShowQuantityModal(false)}
          onAddToPantry={handleAddToPantry}
        />
      )}
    </div>
  );
};

export default Search;
