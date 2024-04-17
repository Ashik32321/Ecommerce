import React from 'react';
import { useNavigate } from "react-router-dom"
import { Container, Row, Col } from 'react-bootstrap';
import "../PurchaseCssFiles/SearchDisplay.css"
import BackButton from '../../OtherComponent/BackButton';
const SearchDisplay = () => {
    const nav = useNavigate()
    const storedDataArrayString = sessionStorage.getItem('searchitem');
    const storedDataArray = JSON.parse(storedDataArrayString);
    const movetobuy = (Mproduct) => {
        nav("/productdisplay", { state: { Mproduct: Mproduct } })
    }

    return (
        <>
            <BackButton />
            {storedDataArray.length === 0 ? (
                <div className="searchitemMessage  container  mt-5 shadow-sm p-5 mb-5 bg-white rounded">
                    <img
                        className="emptyCartImage"
                        src="./Images/emptyproduct.png"
                        alt="searchitem"
                    />
                    <p className='text-danger fw-bold'>  Oops! No product found.</p><br />
                </div>
            ) : (


                <Container fluid className='mt-3 mb-5 '>
                    <Row >

                        {storedDataArray.map((product) => (


                            <div className='d-flex justify-content-center '>
                                <Col md={5} sm={5} xs={12} className=' ms-1 border shadow-sm p-3 mb-5 bg-white rounded ' >

                                    <div className='d-flex justify-content-center product-container'>
                                        <button onClick={() => movetobuy(product)} className='border-0 bg-white' >


                                            <div >
                                                {product.productimagePath && (

                                                    <img src={product.productimagePath} alt={product.productname} className='product-image' />

                                                )}
                                                <div>
                                                    <h6 className='text-primary fw-bold'>{product.productname}</h6>
                                                    <p className='fw-bold'> Price: <span className='text-danger'>₹{product.productprice}</span></p>

                                                </div>
                                            </div>
                                        </button>
                                    </div>

                                </Col>
                            </div>
                        ))}
                    </Row>
                </Container>
            )}
        </>
    );
};

export default SearchDisplay;