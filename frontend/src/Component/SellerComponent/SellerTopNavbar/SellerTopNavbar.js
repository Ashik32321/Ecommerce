import React,{useState} from 'react'

import { Link} from 'react-router-dom'


function SellerTopNavbar() {
  const isButtonVisible =localStorage.getItem("isSellerLoggedIn")
  


  var [sellerallow,setsellerallow]  =useState()

  const logout  = () =>{
    setsellerallow(sellerallow = false)
    localStorage.setItem("isSellerLoggedIn",sellerallow)
    alert("logged out successfuly")
    window.location.reload();
  }
    
  return (
    <nav className='navbar bg-white'>
    <div className='container-fluid ms-3 w-100'>
      <div className='navbar-brand text-primary fw-bold'>
        <img src="./Images/ShopSellerlogo.png" alt="Mini basket" height="60" width="250" />
      </div>
      {isButtonVisible === "true" ? (
                  <button onClick={logout} className='btn btn-danger me-1'>
                  Logout
                </button>
                    ) : (
                      <Link to="/sellerlogin" className='btn btn-success me-1'>
                      Login
                    </Link>)}

     
    </div>
  </nav>
 
  )
}

export default SellerTopNavbar