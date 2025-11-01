import React from 'react';

const SearchForm = ({ value, onChange }) => {
    return (
        <div className="filter-group">
            <label htmlFor="search-coin">Search Coin Name</label>
            <input
                id="search-coin"
                type="text"
                placeholder="Search Coin Name"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default SearchForm;