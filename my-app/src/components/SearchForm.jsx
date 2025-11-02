import React from 'react';
import { Search } from "lucide-react";

const SearchForm = ({ value, onChange }) => {
    return (
        <div className="filter-group" style={{ position: 'relative', width: '100%' }}>
            <Search 
                size={20} 
                color="#888" 
                style={{ 
                    position: 'absolute', 
                    left: '10px', 
                    top: '37%', 
                    transform: 'translateY(-50%)' 
                }} 
            />

            <input
                id="search-coin"
                type="text"
                placeholder="Search Coin Name"
                value={value}
                onChange={onChange}
                style={{
                    paddingLeft: '35px',
                    height: '50px',
                    width: '100%',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    outline: 'none',
                    fontSize: '14px',
                }}
            />
        </div>
    );
};

export default SearchForm;
