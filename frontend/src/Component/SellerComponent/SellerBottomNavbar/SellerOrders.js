import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import BackButton from '../../OtherComponent/BackButton';
import { useNavigate } from 'react-router-dom';
import { RiseLoader } from 'react-spinners';


function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav =useNavigate()
  

  useEffect(() => {
    axios.get('http://localhost:3001/getorderproducts')
      .then((response) =>{setOrders(response.data);
                          setLoading(false)} )
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  const sellerId = sessionStorage.getItem('sellerId');

  // Filter orders based on sellerId
  const sellerOrders = orders.filter(order => order.products.some(product => product.SellerID === sellerId));
  const movetoorder = (SellerOrderproduct) => {
    nav('/sellerorderdisplay', { state: { SellerOrderproduct: SellerOrderproduct} });
  };



  return (
    <>
    <BackButton></BackButton>
    {loading ? (
      <div className="loder-container ">
      <p className='text-center'>
       <RiseLoader color={'#0000FF'} loading={loading} size={15}  /><br/>
       <h6 >Loading...</h6></p>
         
   
     </div>
  ) : (
    <>

    {sellerOrders.length === 0 ? (
      <div className='container bg-white mt-5 p-5'>
        <div className="emptyCartMessage ">
        <img
          className="emptyCartImage"
          src="./Images/NoOrder.jpeg"
          alt="you haven't Ordered Yet"
        />
        <p className='text-danger fw-bold'> Sorry! You Have NoOrder...</p><br />
        
      </div>
      </div>
      ) : (
    <div className='container  mt-5 '>
      <div>
        {sellerOrders.map((order) => (
          <div key={order._id}>
            <div>
              {order.products.map((product) => (
                <button 
                className='w-100 bg-white border mb-2 p-2'
                onClick={() => movetoorder(order)}>
                <div className='container  mt-3 mb-3' key={product._id}>
                  <Row>
                    <Col md={6} sm={6} xs={12}>
                      <p className='text-center'>
                        {product.productimagePath && (
                          <img src={product.productimagePath} alt={product.productname} className='order-image' />
                        )}
                      </p>
                    </Col>
                    <Col md={6} sm={6} xs={12}>
                      <div>
                        <h6 className='fw-bold text-dark'>Product Name : <span className='text-primary'>{product.productname}</span></h6>
                        <p className='fw-bold text-dark'>Price: <span className='text-danger'>₹{product.productprice}</span></p>
                        <p className='fw-bold text-dark'>Quantity: <span className='text-danger'>{product.productquantity}</span></p>
                        <p className='text-success fw-bold'>Your Product have been ordered by a customer</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
      )} </>)}
    </>
  );
}

export default SellerOrders;
