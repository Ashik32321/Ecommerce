import React, { useState, useEffect } from 'react';// Correct the filename if necessary
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';

const SellerFlottingbutton = () => {
    const navigate = useNavigate();

    // Set initial position to bottom right by default
    const [position, setPosition] = useState({ x: 0, y: 0 });

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
        const handleResize = () => {
            if (window.innerWidth > 768) {
                // Desktop view - set initial position to bottom right
                setPosition({ x: window.innerWidth - 200, y: window.innerHeight - 620 });
            } else {
                // Mobile view - set initial position to top right
                setPosition({ x: window.innerWidth - 70, y: 110 });
            }
        };
        // Call handleResize initially
        handleResize();

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
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

export default SellerFlottingbutton;
