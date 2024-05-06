import React, { useState, useEffect } from 'react';
import './stockIndication.css';
import { Alert, Space } from 'antd';

const StockIndication: React.FC = () => {
    const [stockData, setStockData] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        fetchStockData();
    }, []);

    const fetchStockData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/stock-indication/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                })
            });
            const data = await response.json();
            setStockData(data);
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    };

    return (
        <div className="main-stock-Indication">
            <div className='alert-message'>
                <Space direction="vertical" >
                    <div className='stock-Indication-head'>
                        <h3>Low Stock Indication</h3>
                    </div>
                    {Object.entries(stockData).map(([productName, count]) => (
                        <Alert
                            key={productName}
                            message={`${productName} Stock Count is ${count}`}
                            type={count < 3 ? 'error' : 'success'}
                        />
                    ))}
                </Space>
            </div>
        </div>
    );
}

export default StockIndication;
