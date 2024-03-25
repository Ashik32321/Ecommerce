// OrderProgress.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../OtherComponent/BackButton';
import "../PurchaseCssFiles/PurchaseEmpty.css"

const PurchaseOrders = () => {
  const [orders, setOrders] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get('https://ecommerce-5-74uc.onrender.com/getorderproducts')
      .then((response) => setOrders(response.data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  const userId = localStorage.getItem('userId');
  const OrderProduct = orders.filter((product) => userId.includes(product.orderid));

  const movetoorder = (Orderproduct, productid) => {
    nav('/purchaseorderdisplay', { state: { Orderproduct: Orderproduct, productid: productid } });
  };

  return (
    <>
    <BackButton></BackButton>
    {OrderProduct.length === 0 ? (
      <div className='container bg-white mt-5 p-5'>
        <div className="emptyCartMessage ">
        <img
          className="emptyCartImage"
          src="./Images/NoOrder.jpeg"
          alt="you haven't Ordered Yet"
        />
        <p className='text-danger fw-bold'> Oops! you haven't Ordered Yet</p><br />
        <button className='btn btn-primary' onClick={() => { nav("/") }}> Order Now</button>
      </div>
      </div>
      ) : (
    <Container fluid className=' mt-3 mb-5'>
      <div>
        {OrderProduct.map((order) => (
          <div key={order._id} className='mb-4 p-3  rounded'>
            <div>
              {order.products.map((product) => (
                <button
                  key={product._id}
                  className='w-100 bg-white border mb-2 p-2'
                  onClick={() => movetoorder(order, product._id)}
                >
                  <div className='container'>
                    <Row>
                      <Col md={6} sm={6} xs={12} className='mb-3'>
                        <div className='text-center'>
                          <img
                            src={product.productimagePath}
                            alt={product.productname}
                            className='order-image'
                          />
                        </div>
                      </Col>
                      <Col md={6} sm={6} xs={12}>
                        <div>
                          <p className='fw-bold text-dark'>
                            Product Name : <span className='text-primary'>{product.productname}</span>
                          </p>
                          <p className='fw-bold text-dark'>
                            Price: <span className='text-danger'>₹{product.productprice}</span>
                          </p>
                          <p className='fw-bold text-dark'>
                            Quantity : <span className='text-danger'>{product.productquantity}</span> 
                          </p>
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
    </Container>)}
    </>
  );
};

export default PurchaseOrders;
