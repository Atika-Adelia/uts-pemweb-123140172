import React from 'react';
import { RefreshCcw } from 'lucide-react';

const RefreshButton = ({ onClick, loading }) => {
    return (
        <button 
            onClick={onClick} 
            disabled={loading}
            aria-label={loading ? "Refreshing data" : "Refresh data"} 
            className={`refresh-button ${loading ? 'loading' : ''}`}
        >
            <RefreshCcw className="refresh-icon" size={20} />
            {loading ? '🔄 Loading...' : 'Refresh Data'} 
        </button>
    );
};

export default RefreshButton;