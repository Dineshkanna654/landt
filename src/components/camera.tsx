import React, { useEffect, useRef, useState } from 'react';
import './camera.css';
import { Button, Form, Input, Modal, Space } from 'antd';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import SubmitButton from './submitButton';
import { Table, message } from 'antd';
import html2canvas from "html2canvas";
import jsPDF from "jspdf"; 


const msg = message

const columns = [
    {
        title: 'Serial Number',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        render: (text: any, record: any, index: number) => <span>{index + 1}</span>, // Generate serial number dynamically
    },
    {
        title: 'Prediction Result',
        dataIndex: 'PRODUCT NAME',
        key: 'result',
    },
    {
        title: 'Rack Number',
        dataIndex: 'RACK NO',
        key: 'rack number',
    },
    {
        title: 'Weight',
        dataIndex: 'WEIGHT OF THE PRODUCT',
        key: 'Weight',
    },
    {
        title: 'MFG Date',
        dataIndex: 'MANUFACTURING DATE',
        key: 'MFG',
    },
    {
        title: 'Quantity',
        dataIndex: 'QUANTITY',
        key: 'Qty',
    },
    {
        title: 'Price',
        dataIndex: 'PRICE',
        key: 'Qty',
    }
];


const Camera: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [open, setOpen] = useState(false);
    const [isCameraOpen, setCameraState] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
    const draggleRef = useRef<HTMLDivElement>(null);
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [qrData, setQrData] = useState('');
    const [error, setError] = useState('');
    const [messageApi, contextHolder] = msg.useMessage();
    const [data, setData] = useState([]);



    const capture = () => {
        let picturesTaken = 0; // Counter for the number of pictures taken
        const maxPictures = 9; // Maximum number of pictures to capture
        const interval = setInterval(async () => {
            try {
                if (picturesTaken >= maxPictures) {
                    clearInterval(interval); // Stop capturing if the limit is reached
                    return;
                }
                // Capture image and wait for the result
                const imageBlob = await captureImageIfQRCodeDetected();
                // Make API call with the QR data
                await apiCallQrData(imageBlob);
                picturesTaken++; // Increment the counter
            } catch (error) {
                console.error('Error capturing image or making API call:', error);
            }
        }, 7000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    };

    const TableFetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/all-qr-data/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Add serial number to each object in the array
            const modifiedData = data.all_data.map((item: any, index: number) => ({
                ...item,
                serialNumber: index + 1,
            }));

            setData(modifiedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        capture();
        TableFetchData();
    }, []);


    const warning = () => {
        messageApi.open({
            type: 'error',
            content: 'Oops! Some thing went wrong! Contact your Developer!',
        });
    };

    const apiCallQrData = async (imageData: unknown) => {
        try {
            // const imageData = await captureImageIfQRCodeDetected();
            if (!(imageData instanceof Blob)) {
                const falidtocap = () => {
                    messageApi.open({
                        type: 'error',
                        content: 'Failed to capture image data',
                    });
                };
                falidtocap();
                throw new Error('Failed to capture image data');
            }

            const formData = new FormData();
            formData.append('image_data', imageData, 'qr_image.png');

            const response = await fetch('http://localhost:8000/scan-qr/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                warning();
                throw new Error('Failed to scan QR code');
            }

            const data = await response.json();
            setQrData(data.qr_data);
            console.log(data);
            setError('');
        } catch (error) {
            console.error('Error:', error);
            warning();
            setError('Failed to scan QR code');
        }
    };


    const captureImageIfQRCodeDetected = () => {
        // Ensure videoRef.current is not null
        if (!videoRef.current) {
            const VideoNot = () => {
                messageApi.open({
                    type: 'error',
                    content: 'Video element not available',
                });
            };
            VideoNot();
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
            const CanvaNot = () => {
                messageApi.open({
                    type: 'error',
                    content: 'Canvas context not available!',
                });
            };
            CanvaNot();
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
        TableFetchData();
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


    const generatePDF = async () => {
        const content = document.querySelector(".table-pdf") as HTMLElement; // Type assertion
        if (content) {
          html2canvas(content).then((canvas) => {
            const imgData = canvas.toDataURL("");
            const pdf = new jsPDF();
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
    
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
    
            while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              pdf.addPage();
              pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;
            }
            pdf.save("Table.pdf");
          });
        }
      };
    


    const handleStartCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setCameraState(true);
            }
        } catch (error) {
            const CameraError = () => {
                messageApi.open({
                    type: 'error',
                    content: 'Error accessing camera!',
                });
            };
            CameraError();
            console.error('Error accessing camera:', error);
        }
    };

    const handleCloseCamera = () => {
        const videoElement = videoRef.current;
        if (videoElement && videoElement.srcObject) {
            const stream = videoElement.srcObject as MediaStream; // Type assertion
            const tracks = stream.getTracks();

            tracks.forEach(track => {
                track.stop();
            });

            videoElement.srcObject = null;
            setCameraState(false);
        }
    };



    return (
        <div className='main-left-container'>
            <div className='live-camera'>
                <video ref={videoRef} autoPlay playsInline />
                {isCameraOpen == false && <Button onClick={handleStartCamera}>Open Camera</Button>}
                {isCameraOpen && <Button onClick={handleCloseCamera}>Close Camera</Button>}
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
                <Modal title="Prediction Table" visible={isModalOpen} footer={null} onCancel={handleCancelTable} width={700}>
                    <div className='table-pdf'>
                        <Table columns={columns} dataSource={data} />
                        <div className='download-btn'>
                            <Button type='primary' onClick={generatePDF}>Download</Button>
                        </div>
                    </div>
                </Modal>
            </div><br />
        </div>
    );
}

export default Camera;