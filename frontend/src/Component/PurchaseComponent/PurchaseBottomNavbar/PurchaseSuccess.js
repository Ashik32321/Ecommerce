import React from 'react';
import { useNavigate } from 'react-router-dom';

function PurchaseSuccess() {
  const navigate = useNavigate();


  const goToOrders = () => {
    navigate('/purchaseorders', { replace: true });
  };


  const goToHomePage = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className='container shadow-sm p-1 mb-5 bg-white rounded p-3 mt-5 '>
      <p className='text-center'>
        <h4 className='text-success'>Congratulations! Order Placed Successfully</h4><br/>
        <h6 className='text-danger'>THANK YOU FOR SHOPPING AT MINI BASKET</h6><br/>
        <button className='btn btn-primary' onClick={goToOrders}>Go to Orders</button><br/><br/>
        <button className='btn btn-primary' onClick={goToHomePage}>Go to Home Page</button>
      </p>
    </div>
  );
}

export default PurchaseSuccess;
