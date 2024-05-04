import React, { useState } from 'react';
import Header from '../components/header';
import './dashboard.css';
import StockIndication from '../components/stockIndication';
import { Button, Form, Input, Select, Alert, Modal } from 'antd';
import Camera from '../components/camera';

const Dashboard: React.FC = () => {
  const [form] = Form.useForm(); // Ant Design's useForm hook to manage form state
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = useState<any[]>([]);

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
    fetch('http://localhost:8000/api/get-form-data/', {
      method: 'POST', // Sending a POST request
      headers: {
        'Content-Type': 'application/json' // Specify content type as JSON
      },
      // Optional: If you need to send any data with the POST request, you can include it in the body
      // body: JSON.stringify({ key: 'value' }) 
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('form data:', data);
      setFormData(data);
      setIsModalOpen(true);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setIsModalOpen(true);
    });
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
            {formData && Array.isArray(formData) ? ( // Check if formData is an array
              <ul>
                {formData.map((item, index) => (
                  <li key={index}>
                    <strong>Owner Name:</strong> {item.username}<br />
                    <strong>Select:</strong> {item.select}<br />
                    <strong>Quality:</strong> {item.quality}<br />
                    <strong>Comments:</strong> {item.user.introduction}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No data available</p>
            )}
          </Modal>
        </div>

        <div className='camera-table-search'>
          <Camera />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
