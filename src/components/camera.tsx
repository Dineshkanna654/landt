import React, { useRef, useState } from 'react';
import './camera.css';
import { Button, Modal } from 'antd';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';

const Camera: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
    const draggleRef = useRef<HTMLDivElement>(null);


    const showModal = () => {
        setOpen(true);
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
                        
                    </div>
                </Modal>
            </div>

        </div>
    );
}

export default Camera;