// Category.jsx

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../PurchaseCssFiles/Purchasecategory.css";


const PurchaseCategory = () => {
  return (
    <Container  className="w-100 bg-white margin1">
      <Row>
        {/* Mobile Category */}
        <Col md={2} sm={2} xs={4}>
          <div className="category-item">
          <Link to="/mobilecategory" className="text-decoration-none custom-link">
            <img
              src="./Images/Mobile.jpg"
              alt="Mobile Category"
              className="img-fluid border border-dark rounded-circle"
              style={{ height: "auto", width: "auto" }}
            />
            
              <p className="text-fluid text-center">Mobile</p>
            </Link>
          </div>
        </Col>

        {/* Toy Category */}
        <Col md={2} sm={2} xs={4}>
          
          <div className="category-item">
          <Link to="/toycategory" className="text-decoration-none custom-link">
            <img
              src="./Images/Toy.jpg"
              alt="Toy Category"
              className="img-fluid border border-dark rounded-circle"
              style={{ height: "auto", width: "auto" }}
            />
            
              <p className="text-fluid text-center">Toys</p>
            </Link>
          </div>
        </Col>

        {/* Footwear Category */}
        <Col md={2} sm={2} xs={4}>
          <div className="category-item">
          <Link to="/footwearcategory" className="text-decoration-none custom-link">
            <img
              src="./Images/Shoe.jpg"
              alt="Footwear Category"
              className="img-fluid border border-dark rounded-circle"
              style={{ height: "auto", width: "auto" }}
            />
            
              <p className="text-fluid text-center">Footwear</p>
            </Link>
          </div>
        </Col>

        <Col md={2} sm={2} xs={4}>
          <div className="category-item">
          <Link to="/gentscategory" className="text-decoration-none custom-link">
            <img
              src="./Images/Menswear.jpg"
              alt="Menswear Category"
              className="img-fluid border border-dark rounded-circle"
              style={{ height: "auto", width: "auto" }}
            />
           
              <p className="text-fluid text-center">Gents</p>
            </Link>
          </div>
        </Col>

        <Col md={2} sm={2} xs={4}>
          <div className="category-item">
          <Link to="/womenscategory" className="text-decoration-none custom-link">
            <img
              src="./Images/Womenswear.jpg"
              alt="Womenswear Category"
              className="img-fluid border border-dark rounded-circle"
              style={{ height: "auto", width: "auto" }}
            />
          
              <p className="text-fluid text-center">Womens</p>
            </Link>
          </div>
        </Col>

        <Col md={2} sm={2} xs={4}>
          <div className="category-item">
          <Link to="/electroniccategory" className="text-decoration-none custom-link">
            <img
              src="./Images/Electronic.jpg"
              alt="Electronic Category"
              className="img-fluid border border-dark rounded-circle"
              style={{ height: "auto", width: "auto" }}
            />
         
              <p className="text-fluid text-center">Electronic</p>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PurchaseCategory;
