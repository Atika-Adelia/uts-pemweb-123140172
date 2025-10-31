// src/components/CompareWidget.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompareWidget = ({ allCoins }) => {
    // State untuk menyimpan koin yang dipilih di dropdown
    const [selectedCoinToAdd, setSelectedCoinToAdd] = useState('');
    // State untuk menyimpan daftar koin yang akan dibandingkan
    const [compareList, setCompareList] = useState(['bitcoin', 'ethereum']); // Default
    
    const navigate = useNavigate();

    // Fungsi untuk menambah koin ke daftar
    const handleAddCoin = () => {
        if (selectedCoinToAdd && !compareList.includes(selectedCoinToAdd)) {
            setCompareList([...compareList, selectedCoinToAdd]);
            setSelectedCoinToAdd(''); // Reset dropdown
        }
    };

    // Fungsi untuk menghapus koin dari daftar
    const handleRemoveCoin = (coinIdToRemove) => {
        setCompareList(compareList.filter(id => id !== coinIdToRemove));
    };

    // Fungsi untuk tombol "Compare Now"
    const handleCompareClick = () => {
        // Logika ini bisa diarahkan ke halaman detail koin pertama
        // atau ke halaman /compare khusus jika Anda membuatnya.
        if (compareList.length > 0) {
            navigate(`/detail/${compareList[0]}`); 
        }
    };

    return (
        // Menggunakan class 'card' dan 'compare-widget' dari index.css
        <div className="card compare-widget">
            <h4>Compare Cryptos</h4>
            
            {/* Menampilkan daftar koin yang sudah ada di list */}
            {compareList.map(coinId => {
                const coin = allCoins.find(c => c.id === coinId);
                return coin && (
                    <div key={coin.id} className="compare-item">
                        <span>
                            <img src={coin.image} alt={coin.name} style={{ width: '20px', borderRadius: '50%' }} />
                            {coin.name}
                        </span>
                        {/* Tombol X untuk menghapus */}
                        <button className="remove-btn" onClick={() => handleRemoveCoin(coin.id)}>
                            &times; 
                        </button>
                    </div>
                );
            })}

            {/* Input untuk menambah koin baru ke daftar */}
            <div className="add-compare-input">
                <select 
                    value={selectedCoinToAdd} 
                    onChange={(e) => setSelectedCoinToAdd(e.target.value)}
                >
                    <option value="">Add to Compare</option>
                    {allCoins.map(coin => (
                        <option key={coin.id} value={coin.id}>
                            {coin.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleAddCoin}>+</button>
            </div>

            {/* Tombol Hijau "Compare Now" */}
            <button className="compare-action-btn" onClick={handleCompareClick}>
                Compare Now
            </button>
        </div>
    );
};

export default CompareWidget;