
import React, { useState }  from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'
import {  Row, Col } from 'react-bootstrap';
import "../PurchaseCssFiles/PurchaseCheckout.css"
import BackButton from "../../OtherComponent/BackButton"


function PurchaseCheckout() {





 const [value,setvalue]=useState(1)


 const plus =() =>{
  if(value<5){ setvalue(value+1);}
 
 }
 const minus =() =>{
  if(value>1)
  {setvalue(value-1);}
  
 }


const location = useLocation()
const nav=useNavigate()




const total=location.state.Mproduct.productprice*value
sessionStorage.setItem("totalprice",total)
sessionStorage.setItem("quantity",value)












const dataArrayString = JSON.stringify(location.state.Mproduct);

// Store the JSON string in local storage
sessionStorage.setItem('buyproducts', dataArrayString);










  return (
    <>
    <BackButton></BackButton>
    <div>



    <div  className=' container  mt-5 border shadow-sm p-1 mb-5 bg-white rounded   ' >


    <Row  className='ms-0'>

        
      
      
      <Col md={6} sm={6} xs={6}   >
        <p className=' border shadow-sm p-4 mb-5 bg-white rounded  mt-4 text-center'>

      <img src={location.state.Mproduct.productimagePath} alt={location.state.Mproduct.productname}  className='product-image  mb-3'    /><br/>
      <h6 >
      <button onClick={minus} className='btn btn-sm btn-secondary me-1 '>-</button>{value}<button onClick={plus} className='btn btn-sm btn-secondary ms-1 '>+</button></h6></p>
      </Col>
      <Col md={6} sm={6} xs={6}  >
      <div className="card-body">
          <h6 className="card-title   text-primary mt-5">{location.state.Mproduct.productname}</h6>
          <p className="card-text fw-bold ">Price: <span className='text-danger'>₹{location.state.Mproduct.productprice*value}</span></p>
        
          </div>
        
          
      </Col>
      
     
      </Row>
      </div>
      <div  className=' container  mt-5 border shadow-sm p-1 mb-5 bg-white rounded  ' >
    <Row  className='ms-0'>
      
      
      <Col md={12} sm={12} xs={12}   >

      <table className='table table-responsive  fw-bold'>
        <tr>
          <td colSpan={2} className='text-center text-danger fw-bold border-bottom'>Price Detail</td>
        </tr>
        <tr>
          <td>Price</td>
          <td className='text-center'>₹{location.state.Mproduct.productprice*value}</td>
        </tr>
        
         <tr  >
          <td>total</td>
          <td className='text-success text-center'>₹{total}</td>
        </tr>
        <tr>
          <td colSpan={2} className='text-center '><button className='btn  btn-primary bg-primary text-white btn-sm '  onClick={() =>nav("/purchasebuypayment")}>Checkout</button></td>
        </tr>
      </table>
      </Col>
     
      
     
      </Row>
      </div>
      </div>
      </>
  )
}

export default PurchaseCheckout