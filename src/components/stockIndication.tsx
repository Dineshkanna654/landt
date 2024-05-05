import React from 'react';
import './stockIndication.css';
import { Alert, Space } from 'antd';


interface ProductCount {
    [key: string]: number;
}

const StockIndication: React.FC = () => {
    // Product data embedded within the component
    const products = [
        {
            "PRODUCT NAME": "SHAFT 20X20",
            "PRODUCT TYPE": "AUTOMOBILE",
            "WEIGHT OF THE PRODUCT": "20 KG",
            "MANUFACTURING DATE": "10/02/2024",
            "PRICE": "67"
        },
        {
            "PRODUCT NAME": "Dinesh",
            "PRODUCT TYPE": "hello world",
            "WEIGHT OF THE PRODUCT": "50 KG",
            "MANUFACTURING DATE": "04/03/2029",
            "PRICE": "00"
        },
        {
            "PRODUCT NAME": "Kanna",
            "PRODUCT TYPE": "hello world",
            "WEIGHT OF THE PRODUCT": "50 KG",
            "MANUFACTURING DATE": "23/03/2023",
            "PRICE": "09"
        },
        {
            "PRODUCT NAME": "SHAFT 20X20",
            "PRODUCT TYPE": "AUTOMOBILE",
            "WEIGHT OF THE PRODUCT": "2 KG",
            "MANUFACTURING DATE": "12/04/2024",
            "PRICE": "23"
        },
        {
            "PRODUCT NAME": "Dinesh",
            "PRODUCT TYPE": "hello world",
            "WEIGHT OF THE PRODUCT": "50 KG",
            "MANUFACTURING DATE": "XX/xx/xx",
            "PRICE": "00"
        },
        {
            "PRODUCT NAME": "SHAFT 20X20",
            "PRODUCT TYPE": "AUTOMOBILE",
            "WEIGHT OF THE PRODUCT": "20 KG",
            "MANUFACTURING DATE": "10/02/2024",
            "PRICE": "34"
        }
    ]

    const productNames = products.map(product => product["PRODUCT NAME"]);

    const productCount = productNames.reduce((acc, name) => {
        (acc as any)[name] = ((acc as any)[name] || 0) + 1;
        return acc;
    }, {});
    
    console.log(productCount);

    const getStockIndication = (product: any): JSX.Element => {
        let stockCount = 0;
        // Logic to determine stock count based on product properties


        return (
            <div className='stock-Indication-head' key={product["PRODUCT NAME"]}>
                <h3>{product["PRODUCT NAME"]} Stock Indication</h3>
                <Alert
                    message={`Stock Count is ${stockCount}`}
                    type={stockCount <= 10 ? 'error' : 'success'}
                />
            </div>
        );
    };

    return (
        <div className="main-stock-Indication">
            <div className='alert-message'>
                <Space direction="vertical" >
                    {products.map(product => getStockIndication(product))}
                </Space>
            </div>
        </div>
    );
}

export default StockIndication;
