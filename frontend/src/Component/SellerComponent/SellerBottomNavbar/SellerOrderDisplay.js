import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import axios from 'axios';
import '../SellerCssFiles/SellerOrderDisplay.css';
import BackButton from '../../OtherComponent/BackButton';

function SellerOrderDisplay() {
  const location = useLocation();
  const [SellerOrderproduct] = useState(location.state.SellerOrderproduct);
  const [orders, setOrders] = useState([]);
  const [Deliveryaddress, setDeliveryaddress] = useState([]);
  
  const sellerphone = sessionStorage.getItem("sellerphone").replace(/["']/g, '');

  const [sellerdetail, setsellerdetail] = useState([]);

  useEffect(() => {
    // Fetch all products from the server on component mount
    axios.get('https://ecommerce-5-74uc.onrender.com/getsellerprofile')
      .then((response) => setsellerdetail(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);
  
  const sellerId = sessionStorage.getItem("sellerId");
  const SellerProfiles = sellerdetail.filter(pro => sellerId.includes(pro.sellerId));
  
  let totalsales = SellerProfiles.reduce((total, profile) => {
    return total + profile.totalsales;
  }, 0);
  

  useEffect(() => {
    axios
      .get('https://ecommerce-5-74uc.onrender.com/getorderproducts')
      .then((response) => setOrders(response.data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  const orderID = SellerOrderproduct._id;
  const sellerOrder = orders.find((order) => order._id === orderID);
  const sellerOrders = sellerOrder ? sellerOrder.products : [];

  useEffect(() => {
    axios
      .get('https://ecommerce-5-74uc.onrender.com/getdeliveryaddress')
      .then((response) => {
        setDeliveryaddress(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const userId = SellerOrderproduct.orderid;
  const Address = Deliveryaddress.filter((ad) => userId.includes(ad.userId));

  const updateProcessed = async (_id) => {
    try {
      await axios.put(`https://ecommerce-5-74uc.onrender.com/updateProcessed/${_id}`);
      alert('Order accepted');
      window.location.reload();
    } catch (error) {
      console.error('Error in accepting:', error.message);
    }
  };

  const updateshipped = async (_id) => {
    try {
      await axios.put(`https://ecommerce-5-74uc.onrender.com/updateshipped/${_id}`);
      alert('Updated order as shipped');
      window.location.reload();
    } catch (error) {
      console.error('Error updating:', error.message);
    }
  };

  const updatedelivered = async (_id) => {
    totalsales = parseInt(totalsales, 10) + 1;

    try {
        await axios.put(`https://ecommerce-5-74uc.onrender.com/updatedelivered/${_id}`);
        
    } catch (error) {
        console.error('Error updating delivered:', error.message);
    }

    try {
    
      const response = await axios.put(`https://ecommerce-5-74uc.onrender.com/updatedsalesvalue/${sellerphone}`, { totalsales });
      console.log('Server response:', response.data);
      window.location.reload();
       // Log the server response
  } catch (error) {
      console.error('Error updating totalsales:', error.message);
  }
}

  return (
    <>
      <BackButton />
      <div className="container border bg-white mt-3">
        <div>
          <div>
            <div>
              {sellerOrders.map((product) => (
                <div className="product-details1" key={product._id}>
                  <Col md={6} sm={6} xs={6} className="product-image">
                    <p>
                      <div key={product._id}>
                        {product.productimagePath && (
                          <img
                            src={product.productimagePath}
                            alt={product.productname}
                            className="order-image"
                          />
                        )}
                      </div>
                    </p>
                  </Col>
                  <Col md={6} sm={6} xs={6}>
                    <div>
                      <h6 className="text-primary fw-bold">{product.productname}</h6>
                      <p className="fw-bold">
                        Price: <span className="text-danger">₹{product.productprice}</span>
                      </p>
                      {sellerOrder.processed === false && (
                        <button
                          className="btn btn-primary me-1 mt-2"
                          onClick={() => updateProcessed(SellerOrderproduct._id)}
                        >
                          Accept
                        </button>
                      )}
                      {sellerOrder.processed === true && sellerOrder.shipped === false && (
                    
                          
                        <button
                          className="btn btn-primary me-1 mt-2"
                          onClick={() => updateshipped(SellerOrderproduct._id)}
                        >
                          Mark as Shipped
                        </button>
                       
                      )}
                      {sellerOrder.shipped === true && sellerOrder.delivered === false && (
                        <button
                          className="btn btn-primary me-1 mt-2"
                          onClick={() => updatedelivered(SellerOrderproduct._id)}
                        >
                          Mark as Delivered
                        </button>
                      )}
                      {sellerOrder.delivered === true && (
                        <h6 className="text-success">Order Delivered Successfully</h6>
                      )}
                    </div>
                  </Col>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container border bg-white mt-5">
        <h6 className="text-danger">
          <u>Mode of Payment</u>
        </h6>
        <p>{SellerOrderproduct.modeofpayment}</p>
      </div>

      <div className="container border bg-white mt-5 mb-5 payment-address-container">
        {Address.map((DAddress) => (
          <div key={DAddress._id}>
            <h6 className="text-danger">
              <u>Customer Address</u>
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
  );
}

export default SellerOrderDisplay;
