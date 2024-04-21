import React from 'react'
import './stockIndication.css';
import { Alert, Space } from 'antd';

const StockIndication: React.FC = () => {
    return (
        <div className="main-stock-Indication">
            <div className='alert-message'>
                <Space direction="vertical" >
                <div className='stock-Indication-head'>
                    <h3>Low Stock Indication</h3>
                </div>
                    <Alert
                        message="Stock Count is Good!"
                        description="The Number of Stock is 20k"
                        type="success"
                    />
                    <Alert
                        message="Stock is very Low!"
                        description="Only 3 count is there, please buy the stocks!"
                        type="error"
                    />
                </Space>
            </div>
        </div>
    );
}

export default StockIndication;
