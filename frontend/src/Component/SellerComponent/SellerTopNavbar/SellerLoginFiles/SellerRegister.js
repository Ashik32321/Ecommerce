import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import BackButton from "../../../OtherComponent/BackButton";
import { UseSellerRegistration } from './UseSellerRegistration';
import "./CssFiles/SellerLoginReg.css"

function SellerRegister() {
  const [loading, setLoading] = useState(false);
  const [sellerDetails, handleSellerDetails ] = UseSellerRegistration({
    
    sellerId:"",
    sellername: "",
    sellershopname: "",
    sellerphone: "",
    sellergst: "",
    sellerpassword: "",
    sellercpassword: "",
    
  });
const [value,setvalue]=useState({
  sellerlogo: null,

})
  

  const handleImageChange = (e) => {
    setvalue({ ...value, sellerlogo: e.target.files[0] });
  };

  const nav = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sellerDetails.sellerpassword.length < 8) {
      alert("password must be at least 8 characters");
    } else if (sellerDetails.sellerpassword !== sellerDetails.sellercpassword) {
      alert("password mismatch");
    } else {
      setLoading(true)
      const formData = new FormData();
      formData.append('sellername', sellerDetails.sellername);
      formData.append('sellershopname', sellerDetails.sellershopname);
      formData.append('sellerphone', sellerDetails.sellerphone);
      formData.append('sellergst', sellerDetails.sellergst);
      formData.append('sellerpassword', sellerDetails.sellerpassword);
      formData.append('sellerlogo', value.sellerlogo);
      formData.append("sellerId",sellerDetails.sellerId)
      formData.append("totalsales",0)
      sessionStorage.setItem("selleraddressId",sellerDetails.sellerId)

      axios.post("https://ecommerce-5-74uc.onrender.com/sellerregister", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(result => {
          console.log(result);
          if (result.data === "user already registered") {
            alert("seller already registered ");
            setLoading(false)
            nav("/sellerlogin");
          } else if (result.data === "user registered successfully") {
            setLoading(false)
            nav("/selleraddress");
          }
        })
        .catch(err => {
          console.log(err);
          setLoading(false)
          alert("Server error");
        });
    }
  };

  return (
    <>
    <BackButton></BackButton>
    <div className='login-container border mt-3 border-dark bg-white'>
      <div className="mt-5 mb-5">
        <h2 className='text-center text-primary'>Seller Register</h2>
        <div className='d-flex justify-content-center'>
          <form onSubmit={handleSubmit}>
            <table>
              <tr>
                <td className='p-2'>
                  <label htmlFor='sellername' className='form-label'>Username</label>
                  <input
                    type='text'
                    id="sellername"
                    name="sellername"
                    value={sellerDetails.sellername}
                    onChange={handleSellerDetails}
                    className='form-control'
                    required
                  />
                </td>
                <td className='p-2'>
                  <label htmlFor='sellershopname' className='form-label'>ShopName</label>
                  <input
                    type="text"
                    id="sellershopname"
                    name="sellershopname"
                    value={sellerDetails.sellershopname}
                    onChange={handleSellerDetails}
                    className='form-control'
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className='p-2'>
                  <label htmlFor='sellerphone' className='form-label'>Phone</label>
                  <div className='input-group'>
                    <span className='btn btn-primary'>+91</span>
                    <input
                      type="tel"
                      id="sellerphone"
                      name='sellerphone'
                      className='form-control'
                      value={sellerDetails.sellerphone}
                      onChange={handleSellerDetails}
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                </td>
                <td className='p-2'>
                  <label htmlFor='sellergst' className="form-label">Gst Number</label>
                  <input
                    className="form-control"
                    type="text"
                    id="sellergst"
                    name="sellergst"
                    value={sellerDetails.sellergst}
                    onChange={handleSellerDetails}
                    pattern="[0-9]{15}"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" className='p-2'>
                  <label htmlFor="sellerlogo" className="form-label">Insert the Logo</label><br />
                  <input
                    type="file"
                    name="sellerlogo"
                    id="sellerlogo"
                    accept='image/*'
                    onChange={handleImageChange}
                    required
                    className='form-control'
                  />
                </td>
              </tr>
              <tr>
                <td className='p-2'>
                  <label htmlFor='sellerpassword' className='form-label' > Password : </label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      type={showPassword ? "text" : "password"}
                      name="sellerpassword"
                      value={sellerDetails.sellerpassword}
                      onChange={handleSellerDetails}
                      required
                    />
                    <button className="btn btn-primary" type="button" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </td>
                <td className='p-2'>
                  <label className='form-label' > Confirm Password : </label>
                  <input
                    className="form-control"
                    type="password"
                    name="sellercpassword"
                    value={sellerDetails.sellercpassword}
                    onChange={handleSellerDetails}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" className='p-2 text-center' >
                <>
    {loading ? (
     
     <button className="btn btn-secondary w-100">Loading...</button>
  ) : (
                  <button type='submit' className="btn btn-primary w-50">Next</button>)}</>
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default SellerRegister;
