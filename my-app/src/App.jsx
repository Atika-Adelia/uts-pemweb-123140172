import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useCryptoData } from './hooks/useCryptoData';
import CryptoTable from './components/DataTable.jsx'; 
import FilterForm from './components/FilterForm.jsx';   
import RefreshButton from './components/RefreshButton.jsx';
import CryptoDetail from './components/DetailCard.jsx'; 
import PortfolioCalculator from './components/PortfolioCalculator.jsx'; 
import './index.css'; 

const Home = ({ data, loading, error, fetchData }) => {
    const [filter, setFilter] = useState({ name: '', minPrice: 0, maxPrice: Infinity, sort: 'market_cap_desc', volumeRange: 0 });

    const filteredAndSortedData = useMemo(() => {
        if (!data || data.length === 0) return [];
        
        const { name, minPrice, maxPrice, volumeRange, sort } = filter; 

        let filtered = data
            .filter(coin => {
                const nameMatch = coin.name.toLowerCase().includes(name.toLowerCase());
                const priceMatch = coin.current_price >= minPrice && coin.current_price <= maxPrice;
                const volumeMatch = coin.total_volume >= volumeRange;
                return nameMatch && priceMatch && volumeMatch;
            });

        return filtered.sort((a, b) => {
            if (sort === 'price_desc') return b.current_price - a.current_price;
            if (sort === 'price_asc') return a.current_price - b.current_price;
            return b.market_cap - a.market_cap;
        });

    }, [data, filter]); 

    if (loading) return <div className="container"><h2>Memuat Data Market...</h2></div>; 
    
    if (error) return (
        <div className="container" style={{ color: '#ea3943', backgroundColor: '#331a1a', padding: '20px', borderRadius: '8px' }}>
            <h2>⚠️ Koneksi API Gagal</h2>
            <p><strong>Pesan:</strong> {error}</p>
            <p>Silakan tunggu 1-2 menit dan coba muat ulang data.</p>
            <RefreshButton onClick={fetchData} loading={loading} />
        </div>
    ); 

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>💰 Cryptocurrency Market List</h2>
                <RefreshButton onClick={fetchData} loading={loading} />
            </div>
            
            <FilterForm onFilterChange={setFilter} />
   
            <CryptoTable data={filteredAndSortedData} /> 

            <div className="portfolio-card">
                <PortfolioCalculator price={data.find(c => c.id === 'bitcoin')?.current_price || 0} /> 
            </div>
        </div>
    );
};

const App = () => {
    const { data, loading, error, fetchData } = useCryptoData(); 

    return (
        <Router>
            <div className="navbar">
                <h1 id="main-header">Crypto Tracker</h1> {/* ID Selector */}
                <nav>
                    <Link to="/">Market</Link>
                    {/* INI BELUM DIUBAH (BESOK DIUBAH) */}
                </nav>
            </div>
            
            <Routes>
                <Route path="/" element={

                    <Home data={data} loading={loading} error={error} fetchData={fetchData} />
                } />
                <Route path="/detail/:coinId" element={<CryptoDetail />} /> 
            </Routes>
        </Router>
    );
};

export default App;