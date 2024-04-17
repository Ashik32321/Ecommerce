import React, { useState, useEffect } from 'react';
import axios from 'axios'
import "../SellerCssFiles/SellerProfile.css"

import { Container, Row, Col } from 'react-bootstrap';

function SellerProfile() {

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);





  useEffect(() => {
    // Fetch all products from the server on component mount
    axios.get('http://localhost:3001/getsellerprofile')
      .then((response) => {
        setProfile(response.data)
        setLoading(false)
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const sellerId = sessionStorage.getItem("sellerId")
  const SellerProfiles = profile.filter(pro => sellerId.includes(pro.sellerId));


  
  
 



  useEffect(() => {
    axios.get('http://localhost:3001/getproducts')
      .then((response) => {setProducts(response.data);
                            setLoading(false);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);


 
  const SellerProducts = products.filter(product => sellerId.includes(product.SellerID));
 const totalproducts =SellerProducts.length




  return (
     <>
      {loading ? (
      <div>
     </div>
  ) : (

    <Container fluid className=' margin2 border shadow-sm p-1 mb-5 bg-white rounded p-3'>
      {SellerProfiles.map((product) => (
        <Row>
          <Col md={4} sm={4} xs={4}>
            <div className='text-center' >
              {product.sellerlogopath && (
                <img src={product.sellerlogopath} alt={product.sellername} className='setimage1 rounded-circle border border-dark' />
              )}
              <h6 className="   text-primary textfont ">{product.sellershopname}</h6>
            </div>
          </Col>
          <Col md={4} sm={4} xs={4}>
            <div className=' mt-5  text-center'>
              <h4>{totalproducts}</h4>
              <h6 className=" textfont">Total Products</h6>
            </div>
          </Col>
          <Col md={4} sm={4} xs={4} >
            <div className=' mt-5 text-center'>
              <h4>{product.totalsales}</h4>
              <h6 className=" textfont">Total Sales</h6>
            </div>
          </Col>
        </Row>

      ))}
    </Container>)}
    </>
  );
};




export default SellerProfile