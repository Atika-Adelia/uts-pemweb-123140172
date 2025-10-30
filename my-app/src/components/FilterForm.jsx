import React, { useState } from 'react';

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
            volumeRange: parseInt(volumeRange) 
        });
    };

    return (
        <form onSubmit={handleSubmit} className="filter-grid" role="search"> 
            
            <input type="text" placeholder="Search Coin Name" value={name} 
                   onChange={(e) => setName(e.target.value)} />

            <input type="number" placeholder="Min Price (USD)" value={minPrice} 
                   onChange={(e) => setMinPrice(e.target.value)}
                   min="0" /> 

            <input type="number" placeholder="Max Price (USD)" value={maxPrice}
                   onChange={(e) => setMaxPrice(e.target.value)}
                   min={minPrice || "0"} /> 

            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort By"> 
                <option value="market_cap_desc">Market Cap (High-Low)</option>
                <option value="price_desc">Price (High-Low)</option>
                <option value="price_asc">Price (Low-High)</option>
            </select>

            <label style={{ display: 'flex', flexDirection: 'column', color: '#a0a0a0', fontSize: '14px' }}>
                Min 24h Volume: {volumeRange.toLocaleString()} USD
                <input type="range" min="0" max="1000000000" step="1000000" 
                       value={volumeRange}
                       onChange={(e) => setVolumeRange(parseInt(e.target.value))} />
            </label>
            
            <button type="submit" className="submit-btn">Apply Filter</button>
        </form>
    );
};

export default FilterForm;