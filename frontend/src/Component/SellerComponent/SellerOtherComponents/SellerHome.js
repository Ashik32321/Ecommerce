import React from 'react'
import SellerTopNavbar from "../SellerTopNavbar/SellerTopNavbar"
import SellerBottomNavbar from '../SellerBottomNavbar/SellerBottomNavbar'
import SellerProduct from '../SellerProducts/SellerProduct'
import SellerProfile from '../SellerProfile/SellerProfile'
import SellerFooter from './SellerFooter'
import SellerHomeMessage from "./SellerHomeMessage"






function SellerHome() {
  const isButtonVisible =sessionStorage.getItem("isSellerLoggedIn")
  return (
    <div>
      
          <SellerTopNavbar/>
        
        {isButtonVisible === "true" ? (
          <div>
          <SellerProfile/>
         <SellerProduct/>
         <SellerFooter/>
         
         </div>
      ):(<SellerHomeMessage/>) }
        
        
      
        <SellerBottomNavbar/>
  
    </div>
  )
}

export default SellerHome