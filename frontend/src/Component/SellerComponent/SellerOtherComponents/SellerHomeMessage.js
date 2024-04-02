// SellerHomeMessage.js

import React from 'react';
import { Link } from 'react-router-dom';


function SellerHomeMessage() {
  return (
    <div className='container-fluid margin2 bg-white text-center text-fluid p-5'>
       <img src="./Images/MiniBasketM.jpg" alt="Mini basket" className='product-image' />
        <h4 className='text-primary fw-bold'>Mini Basket SellerHub</h4>
        <p className='text-danger fw-bold'>Sell the variety of products here!</p>
        <p className='text-danger fw-bold'>Login to get Access</p>
        <Link to="/sellerlogin" className="btn btn-success mt-2">Login</Link>
      
    </div>
  );
}

export default SellerHomeMessage;
