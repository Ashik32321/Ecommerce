import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import "../SellerCssFiles/SellerProductDisplay.css"
import {  Row, Col } from 'react-bootstrap';
import BackButton from '../../OtherComponent/BackButton';

function SellerProductDisplay() {
    const location = useLocation()


    const  nav = useNavigate()

  
   
    

    const removeproduct = async(_id)=>{
      try {
        await axios.delete(`http://localhost:3001/removesellerproduct/${_id}`);
        alert('Product deleted successfully');
       nav("/sellerhome")
        
      } catch (error) {
        console.error('Error deleting item:', error.message);
        alert("server error")
       
      }


      }

      const changestockvalue = async (_id) => {
        try {
          await axios.put(`http://localhost:3001/updateProductValue/${_id}`);
          alert('Marked Outofstock');
          nav("/sellerhome")
     
        } catch (error) {
          console.error('Error updating product value:', error.message);
        }
      };
      const rechangestockvalue = async (_id) => {
        try {
          await axios.put(`http://localhost:3001/reupdateProductValue/${_id}`);
         alert('Stocked Successfully');
         nav("/sellerhome")
         
        } catch (error) {
          console.error('Error updating product value:', error.message);
        }
      };

     



   

  return (
    <>
    <BackButton></BackButton>
    <div className='container mt-5  border shadow-sm p-1 mb-5 bg-white rounded p-3'>
     
        <Row className='mb-5'>
        <Col md={6} sm={12} xs={12}  >
                <p className='text-center border shadow-sm p-3 mb-5 bg-white rounded  '>
                <img  src={location.state.Mproduct.productimagePath} alt={location.state.Mproduct.productname} className='order-image '></img>
                
                <h6  >Price: <span className='text-danger fw-bold'>₹{location.state.Mproduct.productprice}</span></h6>
                </p>
                </Col>
                <Col md={6} sm={12} xs={12}   >
                <h5 className='text-primary text-fluid text-fixed'>{location.state.Mproduct.productname}</h5>
                
                <label htmlFor='description' className='fw-bold'><u>Description</u></label>
                <textarea name="description"className="form-control border-0 custom-textarea w-100" >{location.state.Mproduct.productdescription}</textarea>

                


               </Col>
               
                </Row>
           <Row>
           <Col md={12} sm={12} xs={12}   >

        <p className='text-center'>     
        <button   onClick={() =>removeproduct(location.state.Mproduct._id)} className='custumbutton me-1 mb-3 bg-primary rounded'>Delete</button>
        {location.state.Mproduct.productstocked === true && (
  <button  
  onClick={() =>changestockvalue(location.state.Mproduct._id) }className="custumbutton bg-primary rounded">Mark OutofStock</button>

         
      ) }
      {location.state.Mproduct.productstocked === false && (
  <button  
  onClick={() =>rechangestockvalue(location.state.Mproduct._id)}className="custumbutton bg-warning">Restock</button>

         
      ) }
      </p>



      
                    </Col>
                    </Row>
                    
       
    </div>
    </>
  )
}

export default SellerProductDisplay