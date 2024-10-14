import React, { useEffect, useRef } from 'react';
import { Canvas, Circle, Rect, Triangle, Textbox, FabricImage } from 'fabric';

const ImageEditor = ({ imageUrl }) => {
    const canvasRef = useRef(null);
    const isCanvasInitialized = useRef(false);

    useEffect(() => {
        if (isCanvasInitialized.current && canvasRef.current) {
            canvasRef.current.dispose();
        }

        const canvas = new Canvas('editor-canvas', {
            width: 800,
            height: 600,
        });

        FabricImage.fromURL(imageUrl, { crossOrigin: 'anonymous' }) 
            .then((img) => {
                img.scaleToWidth(800);
                img.set({
                    left: 0,
                    top: 0,
                    selectable: false
                });
                canvas.add(img);
                canvas.renderAll();
            })
            .catch((error) => {
                console.error('Error loading image:', error);
            });

        canvasRef.current = canvas;
        isCanvasInitialized.current = true;

        return () => {
            if (canvasRef.current) {
                canvasRef.current.dispose();
            }
            isCanvasInitialized.current = false;
        };
    }, [imageUrl]);

    const addText = () => {
        const text = new Textbox('Your Text', {
            left: 50,
            top: 50,
            width: 200,
        });
        canvasRef.current.add(text);
        canvasRef.current.renderAll();
    };

    const addShape = (shape) => {
        let shapeObj;
        switch (shape) {
            case 'circle':
                shapeObj = new Circle({
                    radius: 50,
                    fill: 'blue',
                    left: 100,
                    top: 100,
                });
                break;
            case 'rectangle':
                shapeObj = new Rect({
                    width: 100,
                    height: 50,
                    fill: 'red',
                    left: 150,
                    top: 150,
                });
                break;
            case 'triangle':
                shapeObj = new Triangle({
                    width: 100,
                    height: 100,
                    fill: 'green',
                    left: 200,
                    top: 200,
                });
                break;
            default:
                break;
        }
        if (shapeObj) {
            canvasRef.current.add(shapeObj);
            canvasRef.current.renderAll();
        }
    };

    const downloadImage = () => {
        const dataURL = canvasRef.current.toDataURL({
            format: 'png',
            quality: 1.0,
        });
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'edited-image.png';
        link.click();
    };

    return (
        <div className="container d-flex align-items-start vh-100  mt-4 border p-4 rounded">
            <div className="col-8">
                <canvas id="editor-canvas" ></canvas>
            </div>
            <div className="col-4 d-flex flex-column align-items-start">
                <div className="controls mt-3">
                    <button className="btn btn-primary me-2" onClick={addText}>Add Text</button>
                    <button className="btn btn-success me-2" onClick={() => addShape('circle')}>Add Circle</button>
                    <button className="btn btn-danger me-2" onClick={() => addShape('rectangle')}>Add Rectangle</button>
                    <button className="btn btn-warning me-2 mt-3" onClick={() => addShape('triangle')}>Add Triangle</button>
                    <button className="btn btn-info mt-3" onClick={downloadImage}>Download Image</button>
                </div>
            </div>
        </div>
    );
};

export default ImageEditor;
