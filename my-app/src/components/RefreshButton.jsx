import React from 'react';

const RefreshButton = ({ onClick, loading }) => {
    return (
        <button 
            onClick={onClick} 
            disabled={loading}
            aria-label={loading ? "Refreshing data" : "Refresh data"} 
            className="refresh-button"
        >
            {loading ? '🔄 Loading...' : 'Refresh Data'} 
        </button>
    );
};

export default RefreshButton;