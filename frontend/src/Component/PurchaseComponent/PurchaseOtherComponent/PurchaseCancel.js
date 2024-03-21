import React from 'react';
import { useNavigate } from 'react-router-dom';

function PurchaseCancel() {
  const navigate = useNavigate();


  


  const goToHomePage = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className='container shadow-sm p-1 mb-5 bg-white rounded p-3 mt-5 '>
      <p className='text-center'>
        <h4 className='text-danger'>Oops! Something went wrong</h4><br/>
       
       
        <button className='btn btn-primary' onClick={goToHomePage}>Go to Home Page</button>
      </p>
    </div>
  );
}

export default PurchaseCancel;
