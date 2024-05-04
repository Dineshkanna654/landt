import React from 'react';
import Header from '../components/header';
import './dashboard.css';
import StockIndication from '../components/stockIndication';
import { Button, Form, Input, Select, Alert, Modal } from 'antd';
import Camera from '../components/camera';

const Dashboard: React.FC = () => {
  const [form] = Form.useForm(); // Ant Design's useForm hook to manage form state
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        // Wrap form data under 'data' key
        const formData = { data: values };
        console.log('Form data:', formData);

        // Make POST request to backend
        fetch('http://localhost:8000/api/form-data/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData) // Send form data with 'data' key
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Response:', data);
          // Optionally, you can handle success response here
        })
        .catch(error => {
          console.error('Error:', error);
          // Optionally, you can handle error response here
        });
      })
      .catch(errorInfo => {
        console.log('Validation failed:', errorInfo);
      });
  };

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
            form={form}
            name="wrap"
            labelCol={{ flex: '110px' }}
            labelAlign="left"
            wrapperCol={{ flex: 8 }}
            onFinish={handleSubmit} // Handle form submission
          >
            <Form.Item label="Owner" name="username" rules={[{ required: true, message: 'Please input the owner!' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Select" name="select" rules={[{ required: true, message: 'Please select an option!' }]}>
              <Select style={{ width: '135%', transform: 'translateX(-55px)' }}>
                <Select.Option value="good">Good✌️</Select.Option>
                <Select.Option value="bad">Bad👎</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Quality" name="quality" rules={[{ required: true, message: 'Please input the quality!' }]}>
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
          <Modal title="Completed List" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>

        <div className='camera-table-search'>
          <Camera/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
