import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import "../PurchaseCssFiles/PurchaseProductDisplay.css";
import BackButton from "../../OtherComponent/BackButton"

function PurchaseProductDisplay() {
  const location = useLocation();
  const [isButtonVisible, setisButtonVisible] = useState("false");
  const productId = location.state.Mproduct.productId;
  console.log(productId);

  
  const userlogedin = localStorage.getItem("userlogedin");
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    axios
      .get('https://ecommerce-5-74uc.onrender.com/getcartproducts')
      .then((response) => setCartItems(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);
  const userId = localStorage.getItem('userId');

  const cartProducts = cartItems.filter((cartItem) => userId.includes(cartItem.userId));
  useEffect(() => {
    // Check if storedDataArray is an array
    if (Array.isArray(cartProducts)) {
      const isValuePresent = cartProducts.some(item => item.productId === productId);

      if (isValuePresent) {
        setisButtonVisible("true");
      }
    }
  }, [productId, cartProducts]);


  

  const nav = useNavigate();
 

  const movetobuy = (Mproduct) => {
    nav("/purchasecheckout", { state: { Mproduct: Mproduct } });
  };

  const handleAddToCart = async (product) => {
    try {
      await axios.post('https://ecommerce-5-74uc.onrender.com/addtocart', [product.productId,
                                                           product.productname, 
                                                           product.productimagePath, 
                                                           product.productprice, 
                                                           userId,
                                                           product.SellerID,
                                                           product.productquantity,
                                                           product.productdescription,
                                                           product.isprocessed,
                                                           product.isshipped,
                                                           product.isdelivered], alert("item added successfully"),window.location.reload());

      // Set the state after successfully adding to cart
    } catch (error) {
      console.log('Error adding product:', error.message);
    }
  };

  return (
    <>
    <BackButton></BackButton>
    <div className='container  mt-5 border shadow-sm p-5 mb-5 bg-white rounded  '>
      {location.state.Mproduct.productstocked === false ? (
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
            <Col md={6} sm={12} xs={12}  >
              <p className='text-center border shadow-sm p-3 mb-5 bg-white rounded'>
                <img src={location.state.Mproduct.productimagePath} alt={location.state.Mproduct.productname} className='img-fluid '></img>
                <h6>Price: <span className='text-danger fw-bold'>₹{location.state.Mproduct.productprice}</span></h6>
              </p>
            </Col>
            <Col md={6} sm={12} xs={12}   >
              <h5 className='text-primary text-fluid text-fixed'>{location.state.Mproduct.productname}</h5>
              <label htmlFor='description' className='fw-bold'><u>Description</u></label>
              <textarea name="description" className="form-control border-0 custom-textarea w-100" >{location.state.Mproduct.productdescription}</textarea>
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={12} xs={12}   >

              <p className='text-center'>
                <button onClick={() => movetobuy(location.state.Mproduct)} className='custumbutton me-1 mb-3 bg-warning rounded'>Buy</button>
                {userlogedin === "true" && (
                  <>
                   
                    {isButtonVisible === "true" ? (
                      <button onClick={() => nav("/purchaseaddtocart")} className="custumbutton bg-warning">Go to Cart</button>
                    ):(<button onClick={() => handleAddToCart(location.state.Mproduct)} className="custumbutton bg-warning rounded">Add to cart</button>)}
                  </>
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
