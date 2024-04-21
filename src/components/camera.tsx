import React, { useRef, useState } from 'react';
import './camera.css';
import { Button } from 'antd';

const Camera: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleStartCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    return (
    <div className='main-left-container'>
        <div className='search-item'></div>
        <div className='live-camera'>
        <video ref={videoRef} autoPlay playsInline />
        <Button onClick={handleStartCamera}>Open Camera</Button>
        </div>
    </div>
    );
}

export default Camera;