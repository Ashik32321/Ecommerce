import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {  Col } from 'react-bootstrap';
import axios from 'axios';
import "../PurchaseCssFiles/PurchaseOrderdisplay.css"
import BackButton from '../../OtherComponent/BackButton';


function PurchaseOrderDisplay() {
    const location = useLocation()
    const [orderproduct] = useState(location.state.Orderproduct)

    console.log(location.state.productid)
    const pid = location.state.productid
    const [Deliveryaddress, setDeliveryaddress] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/getdeliveryaddress')
            .then(response => {
                setDeliveryaddress(response.data);

            })
            .catch(error => console.error(error));
    }, []);

    const userId = sessionStorage.getItem("userId")
    const Address = Deliveryaddress.filter(ad => userId.includes(ad.userId));
    const progressData = [
        { step: 'Processing', completed: orderproduct.processed },
        { step: 'Shipped', completed: orderproduct.shipped},
        { step: 'Delivered', completed: orderproduct.delivered },
      ];
    

    return (
        <>
        <BackButton></BackButton>
        <div className='container border bg-white mt-3'>
          <div>
            <div key={orderproduct._id}>
              <div>
                {orderproduct.products.map((product) => (
                  <div className='product-details1' key={product._id}>
                    {product._id === pid && (
                      <>
                        <Col md={6} sm={6} xs={6} className='product-image'>
                          <p>
                            <div key={product._id}>
                              {product.productimagePath && (
                                <img
                                  src={product.productimagePath}
                                  alt={product.productname}
                                  className='order-image'
                                />
                              )}
                            </div>
                          </p>
                        </Col>
                        <Col md={6} sm={6} xs={6}>
                          <div>
                            <h6 className='text-primary fw-bold'>{product.productname}</h6>
                            <p className='fw-bold'>
                              Price: <span className='text-danger'>₹{product.productprice}</span>
                            </p>
                          </div>
                        </Col>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        <div className='container border bg-white mt-2 mb-5'>
          <div className='container mt-4 mb-5'>
            <h4>Order Progress</h4>
            <div className='progress-container'>
              {progressData.map((item, index) => (
                <div key={index} className={`progress-step ${item.completed ? 'completed' : ''}`}>
                  {item.completed && <span className='tick-mark'>&#10004;</span>}
                  {item.step}
                </div>
              ))}
            </div>
          </div>
        </div>
  
        <div className='container border  bg-white mt-5'>
          <h6>
            <u>Mode of Payment</u>
          </h6>
          <p>{orderproduct.modeofpayment}</p>
        </div>
  
        <div className='container border bg-white mt-5 mb-5 payment-address-container'>
          {Address.map((DAddress) => (
            <div key={DAddress._id}>
              <h6>
                <u>Delivery Address</u>
              </h6>
  
              <p>
                {DAddress.username}
                <br />
                {DAddress.userhno},{DAddress.uservillage}
                <br />
                {DAddress.userpincode},{DAddress.userdistrict},{DAddress.userstate}
                <br />
                phone:{DAddress.userphone} Alternative phone{DAddress.useraphone}
              </p>
            </div>
          ))}
        </div>
      </>
    )
}

export default PurchaseOrderDisplay