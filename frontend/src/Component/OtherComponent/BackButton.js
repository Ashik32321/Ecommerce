import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaRedo } from 'react-icons/fa';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleForward = () => {
    navigate(1);
  };

  const handleReload = () => {
    window.location.reload(); // Reload the current page
  };

 
  return (
    <Navbar  bg="white" >
      {/* Back button with icon */}
      <Button variant="btn" onClick={handleBack}>
        <FaArrowLeft />
      </Button>

      {/* Forward button with icon */}
      <Button variant="btn" onClick={handleForward}>
        <FaArrowRight />
      </Button>

      {/* Reload button with icon */}
      <button className="btn" onClick={handleReload}>
        <FaRedo />
      </button>

     
    </Navbar>
  );
};

export default BackButton;
