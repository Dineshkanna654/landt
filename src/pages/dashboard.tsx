import React from 'react';
import Header from '../components/header';
import './dashboard.css';
import StockIndication from '../components/stockIndication';
import { Button, Form, Input, Select } from 'antd';

const Dashboard: React.FC = () => {
  return (
    <div className="dash-container">

      <div className='header-container'>
        <Header />
      </div>

      <div className='paper'>
        <div className='stock-indication'>
          <StockIndication />
        </div>

        <div className='status-form'>
          <div className='form-head'>
            <h3>On Process</h3>
          </div>
          <Form
            name="wrap"
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            // labelWrap
            wrapperCol={{ flex: 8 }}
            // colon={false}
            // style={{ maxWidth: 150 }}
          >
            <Form.Item label="Owner" name="username" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Select">
              <Select style={{width: '135%', transform: 'translateX(-55px)'}}>
                <Select.Option value="good">Good✌️</Select.Option>
                <Select.Option value="bad">Bad👎</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Quality" name="username" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name={['user', 'introduction']} label="Comments">
              <Input.TextArea />
            </Form.Item>
            <div className='submit-btn'>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
