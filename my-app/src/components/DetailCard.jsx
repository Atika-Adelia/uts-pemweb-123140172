/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { useCoinHistory, useCryptoData } from '../hooks/useCryptoData';
import PortfolioCalculator from './PortfolioCalculator.jsx'; 
import { formatCurrency } from '../utils/formatter';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoDetail = () => {
    const { coinId } = useParams(); 
    const navigate = useNavigate();
    
    const { data: allCoins } = useCryptoData(); 
    const { history, loading: loadingHistory } = useCoinHistory(coinId); 

    const coin = allCoins.find(c => c.id === coinId);

    if (!coin && !loadingHistory) {
        return <div className="container"><h2>Koin tidak ditemukan!</h2></div>;
    }

    if (loadingHistory || !coin) {
        return <div className="container"><h2>Memuat Detail {coinId}...</h2></div>;
    }

    const chartData = useMemo(() => {
        if (!history) return { labels: [], datasets: [] };
        
        const labels = history.map(item => new Date(item[0]).toLocaleDateString());
        const prices = history.map(item => item[1]);

        return {
            labels,
            datasets: [{
                label: `Harga ${coin.name} (USD) - 7 Hari`, 
                data: prices,
                borderColor: '#61dafb',
                backgroundColor: 'rgba(97, 218, 251, 0.2)',
                fill: true,
                tension: 0.4
            }],
        };
    }, [history, coin]); 

    // Bagian Chart Options
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: '#e0e0e0' } },
            title: { display: true, text: `${coin.name} Harga 7 Hari Terakhir`, color: '#e0e0e0' },
        },
        scales: {
            x: { ticks: { color: '#a0a0a0' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
            y: { ticks: { color: '#a0a0a0' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
        }
    };

    return (
        <div className="container">
            <button onClick={() => navigate('/')} className="back-button" style={{ marginBottom: '20px' }}>
                &larr; Kembali ke Daftar
            </button>
            <div className="detail-header" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={coin.image} alt={`${coin.name} logo`} style={{ width: '50px', marginRight: '15px' }} />
                <h1>{coin.name} ({coin.symbol.toUpperCase()})</h1>
            </div>
            
            <div className="detail-price">
                <p>Harga Saat Ini: **{formatCurrency(coin.current_price)}**</p>
                <p className={coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}>
                    Perubahan 24h: **{coin.price_change_percentage_24h.toFixed(2)}%**
                </p>
            </div>

            <div className="chart-container">
                <h3>Perkembangan Harga</h3>
                <Line data={chartData} options={chartOptions} />
            </div>

            <div style={{ marginTop: '40px' }}>
                 <PortfolioCalculator price={coin.current_price} />
            </div>
        </div>
    );
};

export default CryptoDetail;