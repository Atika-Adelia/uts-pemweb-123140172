import React, { useState } from 'react';
import SearchForm from './SearchForm.jsx';

const FilterForm = ({ onFilterChange }) => {
    const [name, setName] = useState(''); 
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('market_cap_desc');
    const [volumeRange, setVolumeRange] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onFilterChange({ 
            name, 
            minPrice: parseFloat(minPrice) || 0, 
            maxPrice: parseFloat(maxPrice) || Infinity, 
            sort, 
            volumeRange: parseInt(volumeRange) 
        });
    };

    return (
        <form onSubmit={handleSubmit} className="filter-box-grid card"> 
            <div className="filter-group">
                <label htmlFor="min-price">Min Price (USD)</label>
                <input
                    id="min-price"
                    type="number"
                    placeholder="Min Price (USD)"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    min="0"
                />
            </div>
            
            <div className="filter-group">
                <label htmlFor="max-price">Max Price (USD)</label>
                <input
                    id="max-price"
                    type="number"
                    placeholder="Max Price (USD)"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    min={minPrice || "0"}
                />
            </div>
            
            <div className="filter-group">
                <label htmlFor="sort-by">Market Cap (Sort)</label>
                <select id="sort-by" value={sort} onChange={(e) => setSort(e.target.value)}> 
                    <option value="market_cap_desc">Market Cap (High-Low)</option>
                    <option value="price_desc">Price (High-Low)</option>
                    <option value="price_asc">Price (Low-High)</option>
                </select>
            </div>

            <div className="filter-group full-width">
                <label>Min 24h Volume: {volumeRange.toLocaleString()} USD</label>
                <input
                    type="range"
                    min="0"
                    max="1000000000"
                    step="1000000"
                    value={volumeRange}
                    onChange={(e) => setVolumeRange(parseInt(e.target.value))}
                />
            </div>
            
            <button type="submit" className="apply-filter-button full-width">
                Filter 
            </button>
            
            <div className="full-width">
                <SearchForm 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>
        </form>
    );
};

export default FilterForm;