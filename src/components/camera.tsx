import React, { useEffect, useRef, useState } from 'react';
import './camera.css';
import { Button, Form, Input, Modal, Space } from 'antd';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import SubmitButton from './submitButton';
import { Table, Divider, Tag } from 'antd';
import jsQR from "jsqr";


const columns = [
    {
        title: 'Rack Number',
        dataIndex: 'name',
        key: 'name',
        render: (text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined) => <a>{text}</a>,
    },
    {
        title: 'Prediction Result',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Colour',
        dataIndex: 'address',
        key: 'address',
    },
];

const data = [
    {
        key: '1',
        name: '1',
        age: 'Hardware',
        address: <p style={{ color: 'green' }}>Green</p>,
    },
    {
        key: '2',
        name: '2',
        age: 'Tools',
        address: <p style={{ color: 'green' }}>Green</p>,
    },
    {
        key: '3',
        name: '3',
        age: 'Pen drives',
        address: <p style={{ color: 'green' }}>Green</p>,
    },
];

const Camera: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
    const draggleRef = useRef<HTMLDivElement>(null);
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [qrData, setQrData] = useState('');
    const [error, setError] = useState('');


    const capture = () => {
        const interval = setInterval(() => {
            // Check for QR code and capture image if found
            captureImageIfQRCodeDetected();
            apiCallQrData();
        }, 3000);

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    };

    useEffect(() => {
        capture();
    }, []);

    const apiCallQrData = async () => {
        try {
            const imageData = await captureImageIfQRCodeDetected();
            if (!(imageData instanceof Blob)) {
                throw new Error('Failed to capture image data');
            }
            
            const formData = new FormData();
            formData.append('image_data', imageData, 'qr_image.png');
    
            const response = await fetch('http://localhost:8000/scan-qr/', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Failed to scan QR code');
            }
    
            const data = await response.json();
            setQrData(data.qr_data);
            console.log(data.qr_data);
            setError('');
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to scan QR code');
        }
    };
    

      const captureImageIfQRCodeDetected = () => {
        // Ensure videoRef.current is not null
        if (!videoRef.current) {
            console.error("Video element not available");
            return;
        }
    
        // Code to capture image if QR code is detected
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
    
        // Ensure ctx is not null
        if (!ctx) {
            console.error("Canvas context not available");
            return;
        }
    
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
        // Convert canvas image data to Blob
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    console.log("Open the camera!")
                }
            }, 'image/png'); // Set the desired format to 'image/png'
        });
    };

    const showModal = () => {
        setOpen(true);
    };

    const showModalTable = () => {
        setIsModalOpen(true);
    };

    const handleCancelTable = () => {
        setIsModalOpen(false);
    };

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        setOpen(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        setOpen(false);
    };


    const onStart = (event: DraggableEvent, uiData: DraggableData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };


    const handleStartCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                // capture();
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    return (
        <div className='main-left-container'>

            <div className='live-camera'>
                <video ref={videoRef} autoPlay playsInline />
                <Button onClick={handleStartCamera}>Open Camera</Button>
            </div><br /><br /> <br />

            <div className='search-item'>
                <Button type="primary" onClick={showModal}>Search Prediction Result</Button>
                <Modal
                    title={
                        <div
                            style={{
                                width: '100%',
                                cursor: 'move',
                            }}
                            onMouseOver={() => {
                                if (disabled) {
                                    setDisabled(false);
                                }
                            }}
                            onMouseOut={() => {
                                setDisabled(true);
                            }}
                            // fix eslintjsx-a11y/mouse-events-have-key-events
                            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
                            onFocus={() => { }}
                            onBlur={() => { }}
                        // end
                        >
                            Search Prediction Result
                        </div>
                    }
                    open={open}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    modalRender={(modal: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined) => (
                        <Draggable
                            disabled={disabled}
                            bounds={bounds}
                            nodeRef={draggleRef}
                            onStart={(event: DraggableEvent, uiData: DraggableData) => onStart(event, uiData)}
                        >
                            <div ref={draggleRef}>{modal}</div>
                        </Draggable>
                    )}
                    footer={null}
                >
                    <div className='search-form'>
                        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                            <Form.Item name="rackNumber" label="Rack Number:" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="columnNumber" label="Column Number:" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="itemNumber" label="Item Number:" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Space>
                                    <SubmitButton form={form}>Submit</SubmitButton>
                                    <Button htmlType="reset">Reset</Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
            <br /><br />

            <div className='table-modal'>
                <Button type="primary" onClick={showModalTable}>
                    Click for the Prediction Table
                </Button>
                <Modal title="Prediction Table" open={isModalOpen} footer={null} onCancel={handleCancelTable}>
                    <Table columns={columns} dataSource={data} />
                </Modal>
            </div><br />

            <div className='start-stop'>
                <Button type='primary' className='start' onClick={capture}>Start</Button>
                <Button type='primary' className='stop'>Stop</Button>
            </div>

        </div>
    );
}

export default Camera;