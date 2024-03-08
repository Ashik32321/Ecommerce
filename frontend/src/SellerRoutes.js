import React from 'react'
import {  Routes,Route } from 'react-router-dom'
import SellerHome from './Component/SellerComponent/SellerOtherComponents/SellerHome'
import SellerLogin from "./Component/SellerComponent/SellerTopNavbar/SellerLoginFiles/SellerLogin"
import SellerRegister from './Component/SellerComponent/SellerTopNavbar/SellerLoginFiles/SellerRegister'
import SellerForgotPassword from './Component/SellerComponent/SellerTopNavbar/SellerLoginFiles/SellerForgotPassword'
import SellerAddress from './Component/SellerComponent/SellerTopNavbar/SellerLoginFiles/SellerAddress'
import SellerResetPassword from "./Component/SellerComponent/SellerTopNavbar/SellerLoginFiles/SellerResetPassword"
import SellerAddProducts from './Component/SellerComponent/SellerBottomNavbar/SellerAddProducts'
import SellerOrders from "./Component/SellerComponent/SellerBottomNavbar/SellerOrders"
import SellerOrderDisplay from './Component/SellerComponent/SellerBottomNavbar/SellerOrderDisplay'
import SellerPrivateRoute from './Component/SellerComponent/SellerOtherComponents/SellerPrivateRoute'
import GoToSellerLogin from './Component/SellerComponent/SellerOtherComponents/GoToSellerLogin'
import SellerProductDisplay from './Component/SellerComponent/SellerProducts/SellerProductDisplay'

  


function SellerRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<GoToSellerLogin/>} path="/gotosellerlogin"></Route>
        <Route element={<SellerHome/>} path="/sellerhome"></Route>
        <Route element={<SellerLogin/>} path="/sellerlogin"></Route>
        <Route element={<SellerRegister/>} path='/sellerregister'></Route>
        <Route element={<SellerForgotPassword/>} path="/sellerforgotpassword"></Route>
        <Route element={<SellerAddress/>} path="/selleraddress"></Route>
        <Route element={<SellerResetPassword/>} path="/sellerresetpassword"></Route>
        <Route element={<SellerPrivateRoute><SellerAddProducts/></SellerPrivateRoute>} path="/selleraddproducts"></Route>
        <Route element={<SellerPrivateRoute><SellerOrders/></SellerPrivateRoute>} path="/sellerorders"></Route>
        <Route element={<SellerPrivateRoute><SellerOrderDisplay/></SellerPrivateRoute>} path="/sellerorderdisplay"></Route>
        <Route element={<SellerPrivateRoute><SellerProductDisplay/></SellerPrivateRoute>} path="sellerproductdisplay"></Route>
      </Routes>
    </div>
  )
}

export default SellerRoutes