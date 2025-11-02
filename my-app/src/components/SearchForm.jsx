import React from 'react';
import { Search } from 'lucide-react'; 

const SearchForm = ({ value, onChange }) => {
    return (
        <div className="filter-group">
            <label htmlFor="search-coin">Search Coin Name</label>

            <div className="search-input-wrapper">
                <Search className="search-icon" size={18} /> 
                
                <input
                    id="search-coin"
                    type="text"
                    placeholder="Search Coin Name" 
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default SearchForm;