import React from 'react'

import { Link} from 'react-router-dom'
import "../SellerCssFiles/SellerTopNavbar.css"


function SellerTopNavbar() {
  const isButtonVisible =localStorage.getItem("isSellerLoggedIn")

  const logout = () => {
    localStorage.setItem("isSellerLoggedIn", false)
    alert("logged out successfuly")
    window.location.reload();
}

  
    
  return (
    <nav className='navbar bg-white fixed-top'>
    <div className='container-fluid ms-3 w-100'>
      <div className='navbar-brand text-primary fw-bold'>
        <img src="./Images/ShopSellerlogo.jpg" alt="Mini basket" className='logosize' />
      </div>
      
      {isButtonVisible === "true" ? (
                  <button onClick={logout} className='btn btn-danger me-1 mt-2'>
                  Logout
                </button>
                    ) : (
                      <Link to="/sellerlogin" className='btn btn-success me-1 mt-2'>
                      Login
                    </Link>)}

                  
    </div>
  </nav>
 
  )
}

export default SellerTopNavbar