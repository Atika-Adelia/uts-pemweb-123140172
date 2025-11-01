// src/components/FilterForm.jsx
import React, { useState } from 'react';
import SearchForm from './SearchForm.jsx';

const FilterForm = ({ onFilterChange }) => {
    // ... (state Anda tetap sama)
    const [name, setName] = useState(''); 
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('market_cap_desc');
    const [volumeRange, setVolumeRange] = useState(0);

    const handleSubmit = (e) => {
        // ... (logika submit Anda tetap sama)
    };

    return (
        <form onSubmit={handleSubmit} className="filter-grid"> 
            
            {/* --- KOTAK 1: FILTER INPUTS & TOMBOL --- */}
            <div className="filter-inputs-box card"> 
                {/* Min Price */}
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
                {/* Max Price */}
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
                {/* Market Cap */}
                <div className="filter-group">
                    <label htmlFor="sort-by">Market Cap (Sort)</label>
                    <select id="sort-by" value={sort} onChange={(e) => setSort(e.target.value)}> 
                        <option value="market_cap_desc">Market Cap (High-Low)</option>
                        <option value="price_desc">Price (High-Low)</option>
                        <option value="price_asc">Price (Low-High)</option>
                    </select>
                </div>
                {/* 24h Volume */}
                <div className="filter-group">
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

                {/* --- PINDAHKAN TOMBOL KE SINI --- */}
                <button type="submit" className="apply-filter-button">
                    Filter 
                </button>
                {/* ------------------------------- */}

            </div> {/* END filter-inputs-box */}
            
            {/* --- KOTAK 2: HANYA SEARCH INPUT --- */}
            <div className="search-and-button-box card"> 
                {/* Search Input */}
                <SearchForm 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                
                {/* !!! TOMBOL FILTER DIPINDAHKAN DARI SINI !!! */}
            </div> {/* END search-and-button-box */}

        </form>
    );
};

export default FilterForm;