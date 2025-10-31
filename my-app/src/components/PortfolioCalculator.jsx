import React, { useState } from 'react';
import { formatCurrency } from '../utils/formatter';

const PortfolioCalculator = ({ allCoins }) => {
    const [selectedCoinId, setSelectedCoinId] = useState('bitcoin'); 
    const [amount, setAmount] = useState(0); 
    const selectedCoin = allCoins.find(c => c.id === selectedCoinId);
    const currentPrice = selectedCoin ? selectedCoin.current_price : 0; 
    const totalValue = amount * currentPrice; 

    return (
        <> 
            <h4>💰 Portfolio Calculator</h4>

            <label htmlFor="select-crypto">Select Cryptocurrency</label>
            <select 
                id="select-crypto"
                value={selectedCoinId} 
                onChange={(e) => setSelectedCoinId(e.target.value)}
            >
                {allCoins.map(coin => (
                    <option key={coin.id} value={coin.id}>
                        {coin.name} ({coin.symbol.toUpperCase()})
                    </option>
                ))}
            </select>

            <label htmlFor="coin-amount">Jumlah Koin yang Dimiliki:</label>
            <input
                id="coin-amount"
                type="number"
                min="0" 
                value={amount}
                placeholder="0.00"
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} 
            />

            <p>Harga Per Koin: <strong>{formatCurrency(currentPrice)}</strong></p>
            
            <div className="total-value-display">
                Total Value Portfolio: <strong>{formatCurrency(totalValue)}</strong>
            </div>
        </>
    );
};

export default PortfolioCalculator;