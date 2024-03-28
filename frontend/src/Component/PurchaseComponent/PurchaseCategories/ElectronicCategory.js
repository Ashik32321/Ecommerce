import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RiseLoader } from 'react-spinners'; // Importing RingLoader from react-spinners
import "../PurchaseCssFiles/PurchaseCategorydisplay.css";
import Backbutton from "../../OtherComponent/BackButton";
import PurchaseFooter from "../PurchaseOtherComponent/PurchaseFooter";

function ElectronicCategory() {
    const [loading, setLoading] = useState(true);
    const [Electronicproducts, setElectronicProducts] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        // Fetch mobile products from the server
        axios.get('https://ecommerce-5-74uc.onrender.com/getelectronicproducts')
            .then(response => {
                setElectronicProducts(response.data);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => console.error(error));
    }, []);

    const moveToBuy = (Mproduct) => {
        nav("/productdisplay", { state: { Mproduct: Mproduct } });
    }

    return (
        <>
            <Backbutton />
            <Container fluid className='mt-3 mb-5'>
                {loading ? (
                    <div className="loder-container  ">
                     <p className='text-center'>
                      <RiseLoader color={'#0000FF'} loading={loading} size={15}  /><br/>
                      <h6 >Loading...</h6></p>
                        
                  
                    </div>
                ) : (<>
                    <Row>
                        {Electronicproducts.map((product) => (
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
                     
                
                <PurchaseFooter /></>)}
            </Container>
           
        </>
    )
}

export default ElectronicCategory;
