import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatPercent } from '../utils/formatter'; 

const CryptoTable = ({ data }) => {
    return (
        <table className="crypto-table" role="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th> 
                    <th>Market Cap</th>
                    <th>24h% Change</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((coin, index) => {
                        const priceChangeClass = coin.price_change_percentage_24h > 0 ? 'positive' : 'negative';
                        return (
                            <tr key={coin.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={coin.image} alt={`${coin.name} logo`} style={{ width: '20px', marginRight: '10px' }} />
                                    <strong>{coin.name}</strong> ({coin.symbol?.toUpperCase()})
                                </td>
                                <td>{formatCurrency(coin.current_price)}</td>
                                <td>{formatCurrency(coin.market_cap)}</td>
                                <td className={priceChangeClass}>
                                    {formatPercent(coin.price_change_percentage_24h)}
                                </td>
                                <td>
                                    <Link to={`/detail/${coin.id}`} style={{ color: '#90ee90' }}>Detail</Link>
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                            Tidak ada data koin yang cocok dengan filter.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default CryptoTable;