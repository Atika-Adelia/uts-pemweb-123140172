import { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

export const useCryptoData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL); 
            
            if (!response.ok) {
                let errorMsg = `Gagal mengambil data (${response.status} ${response.statusText}).`;
                if (response.status === 429 || response.status === 426) {
                    errorMsg += ' CoinGecko Rate Limit Terlampaui. Tunggu 1-2 menit sebelum mencoba lagi.';
                }
                throw new Error(errorMsg); 
            }
            const json = await response.json();
            setData(json);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, fetchData }; 
};

export const useCoinHistory = (coinId) => {
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!coinId) return;
            setLoading(true);
            try {
                const historyUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`;
                const response = await fetch(historyUrl);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch history: ${response.status}`);
                }
                const json = await response.json();
                setHistory(json.prices);
            } catch (e) {
                console.error("Failed to fetch history:", e);
                setHistory(null);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [coinId]);

    return { history, loading };
}