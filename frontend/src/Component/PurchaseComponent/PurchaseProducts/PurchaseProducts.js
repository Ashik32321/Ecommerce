import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import "../PurchaseCssFiles/PurchaseProducts.css";
import { RiseLoader } from 'react-spinners';

const PurchaseProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    // Fetch all products from the server on component mount
    axios.get('http://localhost:3001/getproducts')
      .then((response) => {
        const updatedProducts = response.data.map(product => ({
          ...product,
          productprice: Math.round(parseFloat(product.productprice) * 1.01) // Adding 1% commission without decimal points
        }));
        setProducts(updatedProducts);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);
  
  const moveToBuy = (product) => {
    nav("/productdisplay", { state: { Mproduct: product } });
  };

  return (
    <>
     {loading ? (
        <div className="mt-5 ">
          <p className='text-center'>
            <RiseLoader color={'#0000FF'} loading={loading} size={15}  /><br/>
            <h6 >Loading...</h6>
          </p>
        </div>
      ) : (
        <Container fluid className='mt-3 mb-5'>
          <Row>
            {products.map((product) => (
              <Col md={3} sm={4} xs={6} key={product.productId}>
                <div className='product-card'>
                  <button onClick={() => moveToBuy(product)} className='border-0 bg-white'>
                    <div className='d-flex justify-content-center'>
                      {product.productimagePath && (
                        <img src={product.productimagePath} alt={product.productname} className='product-image' />
                      )}
                    </div>
                    <div className='product-details'>
                      <h6 className='product-name text-primary fw-bold'>{product.productname}</h6>
                      <p className='fw-bold product-price'>Price: <span className='text-danger'>₹{product.productprice}</span></p>
                    </div>
                  </button>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default PurchaseProducts;
