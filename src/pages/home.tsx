import React from 'react';
import Header from '../components/header';
import './home.css';
import StockIndication from '../components/stockIndication';
import { Button } from 'antd';
import Camera from '../components/camera';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Header />

      <div className='paper'>
        <div className='stock-indication'>
          <StockIndication />
        </div>

        <div className='start-stop'>
          <Button type='primary' className='start'>Start</Button>
          <Button type='primary' className='stop'>Stop</Button>
        </div>

        <div className='camera-table-search' id='cam-tab'>
          <Camera />
        </div>
      </div>
    </div>
  );
}

export default Home;
