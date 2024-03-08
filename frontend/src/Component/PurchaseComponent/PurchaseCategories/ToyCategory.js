import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../PurchaseCssFiles/PurchaseCategorydisplay.css"
import Backbutton from "../../OtherComponent/BackButton"

function ToyCategory() {
    const [Toyproducts,settoyproducts]=useState([])
    const nav=useNavigate()
    useEffect(() => {
        // Fetch mobile products from the server
        axios.get('http://localhost:3001/gettoyproducts')
          .then(response => settoyproducts(response.data))
          .catch(error => console.error(error));
      }, []);


     

        const moveToBuy =(Mproduct)=>{
          nav("/productdisplay",{state:{Mproduct:Mproduct}})


        }


  return (
    <>
     <Backbutton></Backbutton>
     <Container fluid className='mt-3 mb-5'>
      <Row>
        {Toyproducts.map((product) => (
          <Col md={3} sm={4} xs={12} key={product.productId}>
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
      </>
  )
}

export default ToyCategory