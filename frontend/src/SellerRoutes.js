import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RiseLoader } from 'react-spinners';
import SellerHome from './Component/SellerComponent/SellerOtherComponents/SellerHome';
import SellerLogin from "./Component/SellerComponent/SellerTopNavbar/SellerLoginFiles/SellerLogin";
import SellerRegister from './Component/SellerComponent/SellerTopNavbar/SellerLoginFiles/SellerRegister';
import SellerForgotPassword from './Component/SellerComponent/SellerTopNavbar/SellerLoginFiles/SellerForgotPassword';
import SellerAddress from './Component/SellerComponent/SellerTopNavbar/SellerLoginFiles/SellerAddress';
import SellerResetPassword from "./Component/SellerComponent/SellerTopNavbar/SellerLoginFiles/SellerResetPassword";
import SellerAddProducts from './Component/SellerComponent/SellerBottomNavbar/SellerAddProducts';
import SellerOrders from "./Component/SellerComponent/SellerBottomNavbar/SellerOrders";
import SellerOrderDisplay from './Component/SellerComponent/SellerBottomNavbar/SellerOrderDisplay';
import SellerPrivateRoute from './Component/SellerComponent/SellerOtherComponents/SellerPrivateRoute';
import GoToSellerLogin from './Component/SellerComponent/SellerOtherComponents/GoToSellerLogin';
import SellerProductDisplay from './Component/SellerComponent/SellerProducts/SellerProductDisplay';

function LoadingComponent({ children }) {
  const [loading, setLoading] = useState(true);

  // Simulate loading time, set loading to false after 1.5 seconds
  setTimeout(() => {
    setLoading(false);
  }, 300);

  return loading ? (
    <div className="loder-container   ">
                     <p className='text-center'>
                      <RiseLoader color={'#0000FF'} loading={loading} size={15}  /><br/>
                      <h6 >Loading...</h6></p>
                        
                  
                    </div>
  ) : (
    children
  );
}

function SellerRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<LoadingComponent><GoToSellerLogin/></LoadingComponent>} path="/gotosellerlogin" />
        <Route element={<LoadingComponent><SellerHome/></LoadingComponent>} path="/sellerhome" />
        <Route element={<LoadingComponent><SellerLogin/></LoadingComponent>} path="/sellerlogin" />
        <Route element={<LoadingComponent><SellerRegister/></LoadingComponent>} path='/sellerregister' />
        <Route element={<LoadingComponent><SellerForgotPassword/></LoadingComponent>} path="/sellerforgotpassword" />
        <Route element={<LoadingComponent><SellerAddress/></LoadingComponent>} path="/selleraddress" />
        <Route element={<LoadingComponent><SellerResetPassword/></LoadingComponent>} path="/sellerresetpassword" />
        <Route element={<LoadingComponent><SellerPrivateRoute><SellerAddProducts/></SellerPrivateRoute></LoadingComponent>} path="/selleraddproducts" />
        <Route element={<LoadingComponent><SellerPrivateRoute><SellerOrders/></SellerPrivateRoute></LoadingComponent>} path="/sellerorders" />
        <Route element={<LoadingComponent><SellerPrivateRoute><SellerOrderDisplay/></SellerPrivateRoute></LoadingComponent>} path="/sellerorderdisplay" />
        <Route element={<LoadingComponent><SellerPrivateRoute><SellerProductDisplay/></SellerPrivateRoute></LoadingComponent>} path="sellerproductdisplay" />
      </Routes>
    </div>
  );
}

export default SellerRoutes;
