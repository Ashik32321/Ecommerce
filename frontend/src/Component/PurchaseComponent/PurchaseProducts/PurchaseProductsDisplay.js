import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import "../PurchaseCssFiles/PurchaseProductDisplay.css";
import BackButton from "../../OtherComponent/BackButton";

function PurchaseProductDisplay() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [isButtonVisible, setisButtonVisible] = useState(false); // Changed from "false" to false
  const productId = location.state.Mproduct ? location.state.Mproduct.productId : null;

  const userlogedin = sessionStorage.getItem("userlogedin");
  const userId = sessionStorage.getItem('userId');
  const nav = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('https://ecommerce-5-74uc.onrender.com/getcartproducts');
        const cartItems = response.data;
        
        // Filter cart items based on user ID
        const cartProducts = userId ? cartItems.filter((cartItem) => userId.includes(cartItem.userId)) : [];
        
        // Check if the product is already in the cart
        const isValuePresent = cartProducts.some(item => item.productId === productId);
        setisButtonVisible(isValuePresent);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCartItems();
  }, [productId, userId]);

  const movetobuy = (Mproduct) => {
    nav("/purchasecheckout", { state: { Mproduct: Mproduct } });
  };

  const handleAddToCart = (product) => {
    setLoading(true);

    axios
      .post('https://ecommerce-5-74uc.onrender.com/addtocart', [
        product.productId,
        product.productname,
        product.productimagePath,
        product.productprice,
        userId,
        product.SellerID,
        product.productquantity,
        product.productdescription,
        product.isprocessed,
        product.isshipped,
        product.isdelivered,
      ])
      .then(() => {
        alert("Item added successfully");
        setLoading(false);
        setisButtonVisible(true); // Set the button visible after adding to cart
      })
      .catch((error) => {
        console.log('Error adding product:', error.message);
        setLoading(false); // Reset loading state on error
      });
      window.location.reload()
  };

  return (
    <>
      <BackButton />
      <div className='container mt-5 border shadow-sm p-5 mb-5 bg-white rounded'>
        {location.state.Mproduct && location.state.Mproduct.productstocked === false ? (
          <div className="emptyCartMessage ">
            <img
              className="emptyCartImage"
              src="./Img/Stocked.jpeg"
              alt="Out of stock"
            />
            <p className='text-danger fw-bold'>Product is Out of Stock</p><br />
            <button className='btn btn-primary' onClick={() => { nav("/") }}>Back to Shopping</button>
          </div>
        ) : (
          <>
            <Row className='mb-5'>
<Col md={6} sm={12} xs={12}>
  <p className='text-center border shadow-sm p-3 mb-5 bg-white rounded'>
    <img src={location.state.Mproduct.productimagePath} alt={location.state.Mproduct.productname} className='product-image'></img>
    <h6>Price: <span className='text-danger fw-bold'>₹{location.state.Mproduct.productprice}</span></h6>
  </p>
</Col>
<Col md={6} sm={12} xs={12}>
  <h5 className='text-primary text-fluid text-fixed'>{location.state.Mproduct.productname}</h5>
  <label htmlFor='description' className='fw-bold'><u>Description</u></label>
  <textarea name="description" className="form-control border-0 custom-textarea w-100" >{location.state.Mproduct.productdescription}</textarea>
</Col>
</Row>
            <Row>
              <Col md={12} sm={12} xs={12}>
                <p className='text-center'>
                  <button onClick={() => movetobuy(location.state.Mproduct)} className='custumbutton me-1 mb-3 bg-primary '>Buy</button>
                  {userlogedin === "true" && !isButtonVisible && !loading && (
                    <button onClick={() => handleAddToCart(location.state.Mproduct)} className="custumbutton bg-primary rounded">Add to cart</button>
                  )}
                  {userlogedin === "true" && isButtonVisible && (
                    <button onClick={() => nav("/purchaseaddtocart")} className="custumbutton bg-primary">Go to Cart</button>
                  )}
                 
                  {loading && (
                    <button className='custumbutton bg-secondary rounded'>Loading...</button>
                  )}
                </p>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
}


export default PurchaseProductDisplay;


