import React, { useState } from 'react';
import Header from '../components/header';
import './dashboard.css';
import StockIndication from '../components/stockIndication';
import { Button, Form, Input, Select, Alert, Modal } from 'antd';

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
              <Select style={{ width: '135%', transform: 'translateX(-55px)' }}>
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

        <div className='completed-order'>
            <Alert
              onClick={showModal}
              message="Completed Order"
              description="45 Done!"
              type="success"
              showIcon
            />
          <Modal title="Completed List" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>

        <div className='camera-table-search'>
            
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
