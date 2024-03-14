import React from 'react'
import {  Routes,Route } from 'react-router-dom'
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

function PuchaseRoutes() {
  return (
    <div>
        <Routes>
            <Route  element={<PurchaseLogin/>} path="/purchaselogin"></Route>
            <Route element={<PurchaseForgotPassword/>} path="/purchaseforgotpassword"></Route>
            <Route element={<PurchaseReg/>} path="purchasereg"></Route>
            <Route element={<PurchaseResetPassword/>} path="/purchaseresetpassword"></Route>
            <Route element={<PurchaseHome/>} path="/"></Route>
            <Route element={<GotoPurchaseLogin/>} path="gotopurchaselogin"></Route>
            <Route element={<PurchasePrivate><PurchaseAddtocart/></PurchasePrivate>} path="/purchaseaddtocart"></Route>
            <Route element={<PurchasePrivate><PurchaseOrders/></PurchasePrivate>} path="/purchaseorders"/>
            <Route element={<MobileCategory/>} path="/mobilecategory"></Route>
            <Route element={<ToyCategory/>} path="/toycategory"></Route>
            <Route element={<WomenswearCategory/>} path="/womenscategory"></Route>
            <Route element={<GentsCategory/>} path="/gentscategory"></Route>
            <Route element={<FootwearCategory/>} path="/footwearcategory"></Route>
            <Route element={<ElectronicCategory/>} path="/electroniccategory"></Route>
            <Route element={<PurchaseProductDisplay/>} path="/productdisplay"></Route>
            <Route element={<PurchasePrivate><PurchaseCheckout/></PurchasePrivate>} path="/purchasecheckout"></Route>
            <Route element={<PurchasePrivate><PurchaseBuyPayment/></PurchasePrivate>} path="/purchasebuypayment"></Route>
            <Route element={<PurchasePrivate><PurchaseSuccess/></PurchasePrivate>} path="/success"></Route>
            <Route element={<PurchasePrivate><PurchaseCartPayment/></PurchasePrivate>} path="/purchasecartpayment"></Route>
            <Route element={<PurchasePrivate><PurchaseDeliveryAddress/></PurchasePrivate>} path="/purchasedeliveryaddress"></Route>
            <Route element={<PurchasePrivate><PurchaseOrderDisplay/></PurchasePrivate>} path="/purchaseorderdisplay"></Route>
            <Route element={<SearchDisplay/>} path="/searchdisplay"></Route>
            <Route element={<PurchasePrivate><PurchaseCancel/></PurchasePrivate>} path="cancel"></Route>


            
        </Routes>
    </div>
  )
}

export default PuchaseRoutes