import React from 'react';
import Header from '../components/header';
import './home.css';
import StockIndication from '../components/stockIndication';
import { Button } from 'antd';

const Home: React.FC = () => {
  return (
    <div className="home-container">
        <Header/>

        <div className='paper'>
          <div className='stock-indication'>
              <StockIndication/>
          </div>

          <div className='start-stop'>
              <Button type='primary' className='start'>Start</Button>
              <Button type='primary' className='stop'>Stop</Button>
          </div>
        </div>
    </div>
  );
}

export default Home;
