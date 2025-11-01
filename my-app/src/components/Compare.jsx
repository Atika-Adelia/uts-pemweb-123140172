import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompareWidget = ({ allCoins }) => {
    const [compareList, setCompareList] = useState(['bitcoin', 'ethereum']); //untuk perbandingan
    const [selectedCoinToAdd, setSelectedCoinToAdd] = useState('');
    
    const navigate = useNavigate();

    const handleAddCoin = () => {
        if (selectedCoinToAdd && !compareList.includes(selectedCoinToAdd)) {
            setCompareList([...compareList, selectedCoinToAdd]);
            setSelectedCoinToAdd(''); 
        }
    };

    const handleRemoveCoin = (coinIdToRemove) => {
        setCompareList(compareList.filter(id => id !== coinIdToRemove));
    };

    const handleCompareClick = () => {
        if (compareList.length > 0) {
            navigate(`/detail/${compareList[0]}`); //ke halaman detail koin pertama di list tableeeee
        }
    };

    return (
        <div className="card compare-widget">
            <h4>📄 Compare Cryptos</h4>
        
            {compareList.map(coinId => {
                const coin = allCoins.find(c => c.id === coinId);
                return coin && (
                    <div key={coin.id} className="compare-item">
                        <span>
                            <img src={coin.image} alt={coin.name} style={{ width: '20px', borderRadius: '50%' }} />
                            {coin.name}
                        </span>
                        <button className="remove-btn" onClick={() => handleRemoveCoin(coin.id)}>
                            &times; 
                        </button>
                    </div>
                );
            })}

            <div className="add-compare-input">
                <select 
                    value={selectedCoinToAdd} 
                    onChange={(e) => setSelectedCoinToAdd(e.target.value)}
                >
                    <option value="">Add to Compare</option>
                    {allCoins.map(coin => (
                        <option key={coin.id} value={coin.id} disabled={compareList.includes(coin.id)}>
                            {coin.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleAddCoin}>+</button>
            </div>

            <button className="compare-action-btn" onClick={handleCompareClick}>
                Compare Now
            </button>
        </div>
    );
};

export default CompareWidget;