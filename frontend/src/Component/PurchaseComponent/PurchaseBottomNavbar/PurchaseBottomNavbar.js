// BottomNavbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faShoppingCart, faStore } from '@fortawesome/free-solid-svg-icons';

const PurchaseBottomNavbar = () => {
  return (
    <Navbar fixed="bottom" bg="white" >
      <Nav className="mx-auto fw-bold">
        <Link className='btn me-1' to="/purchaseorders">
          <FontAwesomeIcon icon={faShoppingBag} /> Orders
        </Link>
        <Link className='btn me-1' to="/purchaseaddtocart">
          <FontAwesomeIcon icon={faShoppingCart} /> Cart
        </Link>
        <Link className='btn btn-primary' to="sellerhome">
          <FontAwesomeIcon icon={faStore} /> Become a Seller
        </Link>
      </Nav>
    </Navbar>
  );
};

export default PurchaseBottomNavbar;
