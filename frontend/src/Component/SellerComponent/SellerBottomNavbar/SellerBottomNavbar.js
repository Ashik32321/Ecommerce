// Import necessary packages and components
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faShoppingBag, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const SellBottomNavbar = () => {
  return (
    <Navbar fixed="bottom" bg="white" variant="light">
      <Nav className="mx-auto fw-bold">
        <Link className='btn me-1' to="/selleraddproducts">
          <FontAwesomeIcon icon={faPlus} /> Sell
        </Link>
        <Link className='btn me-1' to="/sellerorders">
          <FontAwesomeIcon icon={faShoppingBag} /> Orders
        </Link>
        <Link className='btn btn-primary' to="/">
          <FontAwesomeIcon icon={faShoppingCart} /> Purchase
        </Link>
      </Nav>
    </Navbar>
  );
};

export default SellBottomNavbar;
