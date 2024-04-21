import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import BackButton from './BackButton';
import { RiseLoader } from 'react-spinners';

const AdminReviewPage = () => {
  const [orders, setOrders] = useState([]);
  const [totalCommission, setTotalCommission] = useState(0);
  const [loading, setLoading] = useState(true);

  // Function to calculate earned commission for a product
  const calculateEarnedCommission = (productPrice) => {
    const commission = Math.floor(productPrice * 0.9901);
    const earned = productPrice - commission;
    return earned; // Assuming 1% commission
  };

  useEffect(() => {
    const calculateTotalCommission = (products) => {
      let totalCommission = 0;
      products.forEach((product) => {
        totalCommission += calculateEarnedCommission(product.productprice);
      });
      return totalCommission;
    };

    axios
      .get('https://ecommerce-5-74uc.onrender.com/getorderproducts')
      .then((response) => {
        const filteredOrders = response.data.filter(order => order.delivered === true);
        setOrders(filteredOrders);
        const total = filteredOrders.reduce((acc, order) => {
          return acc + calculateTotalCommission(order.products);
        }, 0);
        setTotalCommission(total);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching orders:', error));
  }, []); // Empty dependency array ensures the effect runs only once

  if (loading) {
    return (
      <div className="loder-container">
        <p className='text-center'>
          <RiseLoader color={'#0000FF'} loading={loading} size={15} />
          <br />
          <h6>Loading...</h6>
        </p>
      </div>
    );
  }

  return (
    <>
      <BackButton />
      <div className="container-fluid mt-3 border  shadow-sm p-1 mb-5 bg-white ">
        <h1 className='text-primary text-center'>Sales Review</h1>
        <h4>Total Earnings: <span className='text-success ms-2'>₹{totalCommission}</span></h4>
        <div>
          <Row>
            {orders.map((order, index) => (
              <Col key={index} md={4} sm={4} xs={12} className='p-3 mb-2'>
                <div className='border border-dark p-3 fw-bold'>
                  <p className='text-danger'>Order ID: <span className='text-dark fw-normal'>{order.orderid}</span></p>
                  {order.products.map((product) => (
                    <div key={product._id} className='text-danger'>
                      <p>Seller ID: <span className='text-dark fw-normal'>{product.SellerID}</span></p>
                      <p>Product Name: <span className='text-dark fw-normal'>{product.productname}</span></p>
                      <p>Product Price: <span className='text-dark fw-normal'>{product.productprice}</span></p>
                      <p>Earned Commission: <span className='text-dark fw-normal'>{calculateEarnedCommission(product.productprice)}</span></p>
                    </div>
                  ))}
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default AdminReviewPage;
