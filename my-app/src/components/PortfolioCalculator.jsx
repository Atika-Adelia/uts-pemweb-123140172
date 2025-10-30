import React, { useState } from 'react';
import { formatCurrency } from '../utils/formatter';

const PortfolioCalculator = ({ price }) => {
    const [amount, setAmount] = useState(0); 
  
    const totalValue = amount * price; 

    return (
        <div className="portfolio-card">
            <h4>💰 Portfolio Calculator</h4>
            <label htmlFor="coin-amount">Jumlah Koin yang Dimiliki (ex: BTC):</label>
            <input
                id="coin-amount"
                type="number"
                min="0" 
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} 
                aria-label="Amount of coin held"
            />
            <p>Harga Per Koin: **{formatCurrency(price)}**</p>
            <h3 style={{ color: '#61dafb' }}>
                Total Value Portfolio: **{formatCurrency(totalValue)}**
            </h3>
        </div>
    );
};

export default PortfolioCalculator;