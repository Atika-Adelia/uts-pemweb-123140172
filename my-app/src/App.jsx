import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCryptoData } from './hooks/useCryptoData';
import DataTable from './components/DataTable.jsx'; 
import FilterForm from './components/FilterForm.jsx';   
import RefreshButton from './components/RefreshButton.jsx';
import DetailCard from './components/DetailCard.jsx'; 
import PortfolioCalculator from './components/PortfolioCalculator.jsx'; 
import CompareWidget from './components/Compare.jsx'; 
import Navbar from './components/Header.jsx'; 
import './index.css'; 
import './App.css';

const DashboardHome = ({ data, loading, error, fetchData }) => {
    const [tableFilter, setTableFilter] = useState({ name: '', minPrice: 0, maxPrice: Infinity, sort: 'market_cap_desc', volumeRange: 0 });

    const filteredAndSortedData = useMemo(() => {
        if (!data || data.length === 0) return [];
        
        const { name, minPrice, maxPrice, volumeRange, sort } = tableFilter; 

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

    }, [data, tableFilter]); 

    if (loading) return <div className="main-content"><h2>Memuat Data...</h2></div>; 
    
    if (error) {
        return (
          <div style={{ backgroundColor: 'Yellow', color: 'red', padding: '30px', borderRadius: '8px' }}>
            <h2>❌ Koneksi API Gagal</h2>
            <p>Pesan: {error.message}</p>
            <p>Silakan tunggu 1–2 menit dan coba muat ulang data</p>
            <button onClick={fetchData}>Refresh Data</button>
          </div>
        );
      } 

    return (
        <div className="main-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>💰 Cryptocurrency Market List</h2>
                <RefreshButton onClick={fetchData} loading={loading} />
            </div>
        
            <FilterForm onFilterChange={setTableFilter} />
            
            <DataTable data={filteredAndSortedData} /> 

            <div className="card compare-widget">
                <CompareWidget allCoins={data} /> 
            </div>
          
            <div className="card portfolio-card">
                <PortfolioCalculator allCoins={data} /> 
            </div>

        </div>
    );
};

const App = () => {
    const { data, loading, error, fetchData } = useCryptoData(); 

    return (
        <Router>
            <div className="app-layout">

                <Navbar /> 
                <Routes>
                    <Route path="/" element={
                        <DashboardHome data={data} loading={loading} error={error} fetchData={fetchData} />
                    } />

                    <Route 
                        path="/detail/:coinId" 
                        element={<DetailCard allCoins={data} />} 
                    /> 
                    <Route 
                        path="/portfolio" 
                        element={
                            <div className="main-content">
                                <h2>Portfolio Calculator</h2>
                                <div className="card portfolio-card">
                                    <PortfolioCalculator allCoins={data} />
                                </div>
                            </div>
                        } 
                    />

                    <Route 
                        path="/compare" 
                        element={
                            <div className="main-content">
                                <h2>Compare Cryptos</h2>
                                <div className="card compare-widget">
                                    <CompareWidget allCoins={data} />
                                </div>
                            </div>
                        } 
                    />

                </Routes>
            </div>
        </Router>
    );
};

export default App;