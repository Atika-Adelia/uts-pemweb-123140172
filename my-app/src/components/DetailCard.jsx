import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { useCoinHistory } from '../hooks/useCryptoData'; 
import { formatCurrency, formatPercent } from '../utils/formatter'; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DetailCard = ({ allCoins }) => { 
    
    const { coinId } = useParams(); 
    const navigate = useNavigate();
    const { history, loading: loadingHistory } = useCoinHistory(coinId); 

    const coin = allCoins.find(c => c.id === coinId);

    const chartData = useMemo(() => {
        if (!history || !coin) { 
            return { labels: [], datasets: [] }; 
        }
        
        const labels = history.map(item => new Date(item[0]).toLocaleDateString());
        const prices = history.map(item => item[1]);

        return {
            labels,
            datasets: [{
                label: `Harga ${coin.name} (USD) - 7 Hari`, 
                data: prices,
                borderColor: '#4285f4', 
                backgroundColor: 'rgba(66, 133, 244, 0.2)',
                fill: true,
                tension: 0.4
            }],
        };
    }, [history, coin]); 

    if (loadingHistory || !coin) {
        return <div className="main-content"><h2>Memuat Detail {coinId || 'Koin'}...</h2></div>;
    }

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: 'var(--text-secondary)' } },
            title: { display: true, text: `${coin.name} Harga 7 Hari Terakhir`, color: 'var(--text-primary)' },
        },
        scales: {
            x: { ticks: { color: 'var(--text-secondary)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
            y: { ticks: { color: 'var(--text-secondary)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
        }
    };

    return (
        <div className="main-content">
            <button onClick={() => navigate('/')} className="back-button" style={{ marginBottom: 'var(--spacing-xl)' }}>
                &larr; Kembali ke Dashboard
            </button>

            <div className="card detail-header-section">
                <img src={coin.image} alt={`${coin.name} logo`} />
                <h1>{coin.name} ({coin.symbol.toUpperCase()})</h1>
            </div>
            
            <div className="card detail-price-info">
                <p>Harga Saat Ini: <strong>{formatCurrency(coin.current_price)}</strong></p>
                <p className={coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}>
                    Perubahan 24h: <strong>{formatPercent(coin.price_change_percentage_24h)}</strong>
                </p>
            </div>

            <div className="card chart-container">
                <h3>Perkembangan Harga</h3>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default DetailCard;