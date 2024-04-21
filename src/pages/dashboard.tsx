import React from 'react';
import Header from '../components/header';
import './dashboard.css';
import StockIndication from '../components/stockIndication';

const Dashboard: React.FC = () => {
  return (
    <div className="dash-container">
    <div className='header-container'>
        <Header/>
    </div>
    <div className='paper'>
        <div className='stock-indication'>
         <StockIndication/>
        </div>
    </div>
    </div>
  );
}

export default Dashboard;
