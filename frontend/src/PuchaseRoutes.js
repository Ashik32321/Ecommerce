import React, { useState } from 'react';
import {  Routes,Route } from 'react-router-dom'
import { RiseLoader } from 'react-spinners';
import PurchaseLogin from './Component/PurchaseComponent/PurchaseTopNavbar/LoginRegFiles/PurchaseLogin'
import PurchaseForgotPassword from './Component/PurchaseComponent/PurchaseTopNavbar/LoginRegFiles/PurchaseForgotPassword'
import PurchaseReg from './Component/PurchaseComponent/PurchaseTopNavbar/LoginRegFiles/PurchaseReg'
import PurchaseResetPassword from "./Component/PurchaseComponent/PurchaseTopNavbar/LoginRegFiles/PurchaseResetPassword"
import PurchaseHome  from "./Component/PurchaseComponent/PurchaseOtherComponent/PurchaseHome"
import PurchaseAddtocart from './Component/PurchaseComponent/PurchaseBottomNavbar/PurchaseAddtocart'
import PurchaseOrders from './Component/PurchaseComponent/PurchaseBottomNavbar/PurchaseOrders'
import MobileCategory from'./Component/PurchaseComponent/PurchaseCategories/MobileCategory'
import ToyCategory from './Component/PurchaseComponent/PurchaseCategories/ToyCategory'
import WomenswearCategory from './Component/PurchaseComponent/PurchaseCategories/WomensCategory'
import GentsCategory from './Component/PurchaseComponent/PurchaseCategories/GentsCategory'
import FootwearCategory from './Component/PurchaseComponent/PurchaseCategories/FootwearCategory'
import ElectronicCategory from './Component/PurchaseComponent/PurchaseCategories/ElectronicCategory'
import PurchasePrivate from "./Component/PurchaseComponent/PurchaseOtherComponent/PurchasePrivate"
import  GotoPurchaseLogin from "./Component/PurchaseComponent/PurchaseOtherComponent/GotoPurchaseLogin"
import PurchaseProductDisplay from './Component/PurchaseComponent/PurchaseProducts/PurchaseProductsDisplay'
import PurchaseCheckout from "./Component/PurchaseComponent/PurchaseProducts/PurchaseCheckout" 
import PurchaseBuyPayment from "./Component/PurchaseComponent/PurchaseProducts/PurchaseBuyPayment"
import PurchaseSuccess from "./Component/PurchaseComponent/PurchaseBottomNavbar/PurchaseSuccess"
import PurchaseCartPayment from "./Component/PurchaseComponent/PurchaseBottomNavbar/PurchaseCartPayment"
import PurchaseDeliveryAddress from "./Component/PurchaseComponent/PurchaseProducts/PurchaseDeliveryAddress"
import PurchaseOrderDisplay from "./Component/PurchaseComponent/PurchaseBottomNavbar/PurchaseOrderDisplay"
import SearchDisplay from './Component/PurchaseComponent/PurchaseTopNavbar/SearchDisplay'
import PurchaseCancel from './Component/PurchaseComponent/PurchaseOtherComponent/PurchaseCancel'
import ContactPage from './Component/OtherComponent/ContactPage'
import PurchaseEditAddress from './Component/PurchaseComponent/PurchaseProducts/PurchaseEditAddress';



function LoadingComponent({ children }) {
  const [loading, setLoading] = useState(true);

  // Simulate loading time, set loading to false after 1.5 seconds
  setTimeout(() => {
    setLoading(false);
  }, 1500);

  return loading ? (
    <div className="loder-container ">
                     <p className='text-center'>
                      <RiseLoader color={'#0000FF'} loading={loading} size={15}  /><br/>
                      <h6 >Loading...</h6></p>
                        
                  
                    </div>
  ) : (
    children
  );
}

function PuchaseRoutes() {
  return (
    <div>
        <Routes>
        <Route element={<LoadingComponent><PurchaseLogin /></LoadingComponent>} path="/purchaselogin" />
        <Route element={<LoadingComponent><PurchaseForgotPassword /></LoadingComponent>} path="/purchaseforgotpassword" />
        <Route element={<LoadingComponent><PurchaseReg /></LoadingComponent>} path="/purchasereg" />
        <Route element={<LoadingComponent><PurchaseResetPassword /></LoadingComponent>} path="/purchaseresetpassword" />
        <Route element={<LoadingComponent><PurchaseHome /></LoadingComponent>} path="/" />
        <Route element={<LoadingComponent><GotoPurchaseLogin /></LoadingComponent>} path="gotopurchaselogin" />
        <Route element={<LoadingComponent><PurchasePrivate><PurchaseAddtocart /></PurchasePrivate></LoadingComponent>} path="/purchaseaddtocart" />
        <Route element={<LoadingComponent><PurchasePrivate><PurchaseOrders /></PurchasePrivate></LoadingComponent>} path="/purchaseorders" />
        <Route element={<LoadingComponent><MobileCategory /></LoadingComponent>} path="/mobilecategory" />
        <Route element={<LoadingComponent><ToyCategory /></LoadingComponent>} path="/toycategory" />
        <Route element={<LoadingComponent><WomenswearCategory /></LoadingComponent>} path="/womenscategory" />
        <Route element={<LoadingComponent><GentsCategory /></LoadingComponent>} path="/gentscategory" />
        <Route element={<LoadingComponent><FootwearCategory /></LoadingComponent>} path="/footwearcategory" />
        <Route element={<LoadingComponent><ElectronicCategory /></LoadingComponent>} path="/electroniccategory" />
        <Route element={<LoadingComponent><PurchaseProductDisplay /></LoadingComponent>} path="/productdisplay" />
         
            <Route element={<LoadingComponent><PurchasePrivate><PurchaseCheckout/></PurchasePrivate></LoadingComponent>} path="/purchasecheckout"></Route>
            <Route element={<LoadingComponent><PurchasePrivate><PurchaseBuyPayment/></PurchasePrivate></LoadingComponent>} path="/purchasebuypayment"></Route>
            <Route element={<LoadingComponent><PurchasePrivate><PurchaseSuccess/></PurchasePrivate></LoadingComponent>} path="/success"></Route>
            <Route element={<LoadingComponent><PurchasePrivate><PurchaseCartPayment/></PurchasePrivate></LoadingComponent>} path="/purchasecartpayment"></Route>
            <Route element={<LoadingComponent><PurchasePrivate><PurchaseDeliveryAddress/></PurchasePrivate></LoadingComponent>} path="/purchasedeliveryaddress"></Route>
            <Route element={<LoadingComponent><PurchasePrivate><PurchaseOrderDisplay/></PurchasePrivate></LoadingComponent>} path="/purchaseorderdisplay"></Route>
            <Route element={<LoadingComponent><SearchDisplay/></LoadingComponent>} path="/searchdisplay"></Route>
            <Route element={<LoadingComponent><PurchasePrivate><PurchaseCancel/></PurchasePrivate></LoadingComponent>} path="cancel"></Route>
            <Route element={<LoadingComponent><ContactPage/></LoadingComponent>} path="/contactpage"></Route>
            <Route element={<LoadingComponent><PurchasePrivate><PurchaseEditAddress/></PurchasePrivate></LoadingComponent>} path="/purchaseeditaddress"></Route>


            
        </Routes>
    </div>
  )
}

export default PuchaseRoutes