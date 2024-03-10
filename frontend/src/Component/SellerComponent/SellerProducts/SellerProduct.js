import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap';
import "../SellerCssFiles/SellerProduct.css"
import { useNavigate } from 'react-router-dom';


const SellerProduct= () => {
  const [products, setProducts] = useState([]);
  const nav=useNavigate()

 



  useEffect(() => {
    axios.get('http://localhost:3001/getproducts')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);


  const sellerId=localStorage.getItem("sellerId")
  const SellerProducts = products.filter(product => sellerId.includes(product.SellerID));

  const Productlength=SellerProducts.length
  localStorage.setItem("Productlength",Productlength)

  const moveToDisplay =(Mproduct)=>{
    nav("/sellerproductdisplay",{state:{Mproduct:Mproduct}})


  }

 
  return (
    <div className='container-fluid mt-5 border shadow-sm p-5 mb-5 bg-white rounded'>
      {SellerProducts.length === 0 ? (
        <div className="emptyCartMessage">
          <img
            className="emptyCartImage"
            src="./Images/emptyproduct.png"
            alt=" empty products"
          />
          <p className='text-danger fw-bold'>Oops! you have not added any products</p><br />
          
        </div>
      ) : (
        <Container fluid className='mt-3 mb-5'>
          <Row>
            {SellerProducts.map((product) => (
              <Col md={3} sm={4} xs={12} key={product.productId}>
                <div className='product-card'>
                  <button onClick={() => moveToDisplay(product)} className='border-0 bg-white'>
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
    </div>
  );
};

export default SellerProduct;