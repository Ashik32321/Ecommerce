import React, { useState, useEffect } from 'react';
import '../PurchaseCssFiles/FlottingButton.css'; // Correct the filename if necessary
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';

const FlottingButton = () => {
    const navigate = useNavigate();
    
    // Set initial position to bottom of the navbar
    const [position, setPosition] = useState({ x: 5, y: 40 });

    const handleDragStart = (e) => {
        e.dataTransfer.setDragImage(new Image(), 0, 0);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        setPosition({
            x: e.clientX - 25,
            y: e.clientY - 25,
        });
    };

    useEffect(() => {
        window.addEventListener('dragover', handleDragOver);
        window.addEventListener('drop', handleDrop);

        return () => {
            window.removeEventListener('dragover', handleDragOver);
            window.removeEventListener('drop', handleDrop);
        };
    }, []);

    const handleClick = () => {
        navigate("/contactpage");
    };

    const buttonStyle = {
        left: `${position.x}px`,
        top: `${position.y}px`,
    };

    return (
        <button
            className="floating-button"
            onClick={handleClick}
            draggable="true"
            onDragStart={handleDragStart}
            style={buttonStyle}
        >
            <FontAwesomeIcon icon={faHeadset} /> {/* Using phone icon for customer care */}
        </button>
    );
};

export default FlottingButton;
