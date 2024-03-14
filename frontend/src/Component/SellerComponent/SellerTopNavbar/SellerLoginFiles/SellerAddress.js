import React from 'react'
import "../../SellerCssFiles/SellerLoginReg.css"
import { UseSellerRegistration } from './UseSellerRegistration';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SellerAddress() {
  const sellerId=localStorage.getItem("selleraddressId")
  const [value, handlevalue] = UseSellerRegistration({
    sellerstate: "",
    sellerpincode: "",
    sellerdistrict: "",
    sellerthaluk: "",
    sellervillage: "",
    sellerId:sellerId
  })
  
  const nav = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("https://ecommerce-5-74uc.onrender.com/selleraddress", { ...value })
      .then(result => {
        console.log(result)
        if (result.data === "added successfully") {
          alert("address added successfully")
          nav("../sellerlogin")
        }
      })
      .catch(err => {
        console.log(err)
        alert("Server error")
      });
  }

  return (
    <>
   
    <div className='container border border-dark mt-3 bg-white'>
      <div className='mt-5 mb-5'>
        <h2 className='text-center text-primary'>Shop Address</h2>
        <div className='d-flex justify-content-center'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='sellerstate' className='form-label'>State</label>
            <input
              type="text"
              name="sellerstate"
              id="sellerstate"
              className='form-control'
              value={value.sellerstate}
              onChange={handlevalue}
            />
            <label htmlFor='sellerpincode' className='form-label'> pincode </label>
            <input
              type="text"
              name="sellerpincode"
              id="sellerpincode"
              className='form-control'
              value={value.sellerpincode}
              onChange={handlevalue}
            />
            <label htmlFor='district' className='form-label'> District </label>
            <input
              type="text"
              name="sellerdistrict"
              id="sellerdistrict"
              className='form-control'
              value={value.sellerdistrict}
              onChange={handlevalue}
            />
            <label htmlFor='sellerthaluk' className='form-label'>Thaluk</label>
            <input
              type="text"
              id="sellerthaluk"
              name="sellerthaluk"
              className='form-control'
              value={value.sellerthaluk}
              onChange={handlevalue}
            />
            <label htmlFor='sellervillage' className='form-label'>Village/Town</label>
            <input
              type="text"
              name="sellervillage"
              id="sellervillage"
              className='form-control'
              value={value.sellervillage}
              onChange={handlevalue}
            /><br />
            <button className='btn btn-primary w-100'>Submit</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default SellerAddress;
