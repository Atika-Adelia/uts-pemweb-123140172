import React, { useState, useMemo } from 'react';
import { formatCurrency, formatPercent } from '../utils/formatter'; 
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Banknote, Shield } from 'lucide-react'; 

const CompareWidget = ({ allCoins }) => {
    const [compareList, setCompareList] = useState(['bitcoin', 'ethereum']);
    const [selectedCoinToAdd, setSelectedCoinToAdd] = useState('');
    const [comparisonData, setComparisonData] = useState([]); 
    
    const handleAddCoin = () => {
        if (selectedCoinToAdd && !compareList.includes(selectedCoinToAdd)) {
            setCompareList([...compareList, selectedCoinToAdd]);
            setSelectedCoinToAdd(''); 
        }
    };

    const handleRemoveCoin = (coinIdToRemove) => {
        const newList = compareList.filter(id => id !== coinIdToRemove);
        setCompareList(newList);
        setComparisonData(allCoins.filter(coin => newList.includes(coin.id)));
    };

    const handleCompareClick = () => {
        const dataToCompare = allCoins.filter(coin => compareList.includes(coin.id));
        setComparisonData(dataToCompare); 
    };

    const analysis = useMemo(() => {
        if (comparisonData.length < 1) return null; 

        const highestPrice = comparisonData.reduce((max, coin) => 
            (coin.current_price || 0) > max.value ? { name: coin.name, value: coin.current_price } : max, 
            { name: '', value: -Infinity }
        );
        const highestCap = comparisonData.reduce((max, coin) => 
            (coin.market_cap || 0) > max.value ? { name: coin.name, value: coin.market_cap } : max, 
            { name: '', value: -Infinity }
        );
        const bestPerformer = comparisonData.reduce((max, coin) => 
            (coin.price_change_percentage_24h || 0) > max.value ? { name: coin.name, value: coin.price_change_percentage_24h } : max, 
            { name: '', value: -Infinity }
        );
        const worstPerformer = comparisonData.reduce((min, coin) => 
            (coin.price_change_percentage_24h || 0) < min.value ? { name: coin.name, value: coin.price_change_percentage_24h } : min, 
            { name: '', value: Infinity }
        );

        return { highestPrice, highestCap, bestPerformer, worstPerformer };
    }, [comparisonData]);


    return (
        <>
            <div className="card compare-widget">
                {compareList.map(coinId => {
                    const coin = allCoins.find(c => c.id === coinId);
                    return coin && (
                        <div key={coin.id} className="compare-item">
                            <span>
                                <img src={coin.image} alt={coin.name} style={{ width: '20px', borderRadius: '50%' }} />
                                {coin.name}
                            </span>
                            <button className="remove-btn" onClick={() => handleRemoveCoin(coinId)}>
                                &times; 
                            </button>
                        </div>
                    );
                })}
                <div className="add-compare-input">
                    <select value={selectedCoinToAdd} onChange={(e) => setSelectedCoinToAdd(e.target.value)}>
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

            {comparisonData.length > 0 && (
                <div className="card comparison-results-container">
    
                    {analysis && (
                        <div className="analysis-summary">
                            <h3>ANALISIS HASIL PERBANDINGAN</h3>
                            <div className="analysis-grid">
                                <div className="analysis-card">
                                    <span className="analysis-label"><Banknote size={16} /> Highest Price : </span>
                                    <span className="analysis-value">{analysis.highestPrice.name} sebesar </span>
                                    <span className="analysis-stat">{formatCurrency(analysis.highestPrice.value)}</span>
                                </div>
                                <div className="analysis-card">
                                    <span className="analysis-label"><Shield size={16} /> Highest Market Cap : </span>
                                    <span className="analysis-value">{analysis.highestCap.name} sebesar </span>
                                    <span className="analysis-stat">{formatCurrency(analysis.highestCap.value)}</span>
                                </div>
                                <div className="analysis-card positive-stat">
                                    <span className="analysis-label"><TrendingUp size={16} /> Best 24h Performance : </span>
                                    <span className="analysis-value">{analysis.bestPerformer.name} sebesar </span>
                                    <span className="analysis-stat positive">{formatPercent(analysis.bestPerformer.value)}</span>
                                </div>
                                <div className="analysis-card negative-stat">
                                    <span className="analysis-label"><TrendingDown size={16} /> Worst 24h Performance : </span>
                                    <span className="analysis-value">{analysis.worstPerformer.name} sebesar </span>
                                    <span className="analysis-stat negative">{formatPercent(analysis.worstPerformer.value)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="comparison-results-internal" style={{ marginTop: 'var(--spacing-lg)' }}>
                        <h3 style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--spacing-lg)' }}>
                            TABEL HASIL PERBANDINGAN
                        </h3>
                        <div className="crypto-table-container">
                            <table className="crypto-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Market Cap</th>
                                        <th>24h%</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonData.map(coin => {
                                        const priceChangeClass = coin.price_change_percentage_24h > 0 ? 'positive' : 'negative';
                                        return (
                                            <tr key={coin.id}>
                                                <td data-label="Name">
                                                    <div className="coin-info">
                                                        <img src={coin.image} alt={coin.name} />
                                                        <div>
                                                            <span className="coin-name">{coin.name}</span>
                                                            <span className="coin-symbol"> ({coin.symbol?.toUpperCase()})</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td data-label="Price">{formatCurrency(coin.current_price)}</td>
                                                <td data-label="Market Cap">{formatCurrency(coin.market_cap)}</td>
                                                <td data-label="24h%" className={priceChangeClass}>
                                                    {formatPercent(coin.price_change_percentage_24h)}
                                                </td>
                                                <td data-label="Action">
                                                    <Link to={`/detail/${coin.id}`}>
                                                        Detail
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CompareWidget;