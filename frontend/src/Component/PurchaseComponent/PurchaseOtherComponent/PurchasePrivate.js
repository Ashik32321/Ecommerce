import React from 'react'
import { Navigate} from 'react-router-dom'

function PurchasePrivate({children}) {
const value=sessionStorage.getItem("userlogedin")

   return value === "true" ? children : <Navigate to="/gotopurchaselogin"/>;
   
}


export default PurchasePrivate