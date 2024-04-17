import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode

import "../PurchaseCssFiles/PurchaseProductDisplay.css";
import BackButton from "../../OtherComponent/BackButton";

function PurchaseProductDisplay() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const productId = location.state.Mproduct ? location.state.Mproduct.productId : null;
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const nav = useNavigate();

    // Check if the user is authenticated using JWT token
    const checkAuthentication = () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000; // Current time in seconds
                setIsAuthenticated(decodedToken.exp > currentTime);
            } catch (error) {
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuthentication();

        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getcartproducts');
                const cartItems = response.data;
                
                // Filter cart items based on user ID
                const userId = sessionStorage.getItem('userId'); // Assuming you store the user ID in sessionStorage
                const cartProducts = userId ? cartItems.filter((cartItem) => cartItem.userId === userId) : [];
                
                // Check if the product is already in the cart
                const isValuePresent = cartProducts.some(item => item.productId === productId);
                setIsButtonVisible(isValuePresent);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchCartItems();
    }, [productId]);

    const movetobuy = (Mproduct) => {
        nav("/purchasecheckout", { state: { Mproduct: Mproduct } });
    };

    const handleAddToCart = (product) => {
      setLoading(true);
      const userId = sessionStorage.getItem('userId');
  
      // Send a POST request with an object as the request body
      axios
          .post('http://localhost:3001/addtocart', {
              productId: product.productId,
              productname: product.productname,
              productimagePath: product.productimagePath,
              productprice: product.productprice,
              userId,
              SellerID: product.SellerID,
              productquantity: product.productquantity,
              productdescription: product.productdescription,
          })
          .then((response) => {
              // Check the response status code
              if (response.status === 201) {
                  alert("Item added successfully");
                  setIsButtonVisible(true);
              } else {
                  alert('Failed to add item to cart');
              }
              setLoading(false);
          })
          .catch((error) => {
              console.error('Error adding product:', error.message);
              alert('An error occurred while adding the product to the cart.');
              setLoading(false); // Reset loading state on error
          });
  };
  

    return (
        <>
            <BackButton />
            <div className='container mt-5 border shadow-sm p-5 mb-5 bg-white rounded'>
                {location.state.Mproduct && location.state.Mproduct.productstocked === false ? (
                    <div className="emptyCartMessage">
                        <img
                            className="emptyCartImage"
                            src="./Images/Stocked.jpeg"
                            alt="Out of stock"
                        />
                        <p className='text-danger fw-bold'>Product is Out of Stock</p><br />
                        <button className='btn btn-primary' onClick={() => nav("/")}>Back to Shopping</button>
                    </div>
                ) : (
                    <>
                        <Row className='mb-5'>
                            <Col md={6} sm={12} xs={12}>
                                <p className='text-center border shadow-sm p-3 mb-5 bg-white rounded'>
                                    <img
                                        src={location.state.Mproduct.productimagePath}
                                        alt={location.state.Mproduct.productname}
                                        className='product-image'
                                    />
                                    <h6>Price: <span className='text-danger fw-bold'>₹{location.state.Mproduct.productprice}</span></h6>
                                </p>
                            </Col>
                            <Col md={6} sm={12} xs={12}>
                                <h5 className='text-primary text-fluid text-fixed'>{location.state.Mproduct.productname}</h5>
                                <label htmlFor='description' className='fw-bold'><u>Description</u></label>
                                <textarea
                                    name="description"
                                    className="form-control border-0 custom-textarea w-100"
                                    readOnly
                                >
                                    {location.state.Mproduct.productdescription}
                                </textarea>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} sm={12} xs={12}>
                                <p className='text-center'>
                                    <button
                                        onClick={() => movetobuy(location.state.Mproduct)}
                                        className='custumbutton me-1 mb-3 bg-primary'
                                    >
                                        Buy
                                    </button>
                                    {/* Add "Add to cart" button if the user is authenticated and the product is not already in the cart */}
                                    {isAuthenticated && !isButtonVisible && !loading && (
                                        <button
                                            onClick={() => handleAddToCart(location.state.Mproduct)}
                                            className="custumbutton bg-primary rounded"
                                        >
                                            Add to cart
                                        </button>
                                    )}
                                    {/* Display "Go to Cart" button if the product is already in the cart */}
                                    {isAuthenticated && isButtonVisible && (
                                        <button
                                            onClick={() => nav("/purchaseaddtocart")}
                                            className="custumbutton bg-primary"
                                        >
                                            Go to Cart
                                        </button>
                                    )}
                                    {/* Display loading indicator */}
                                    {loading && (
                                        <button className='custumbutton bg-secondary rounded'>
                                            Loading...
                                        </button>
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
