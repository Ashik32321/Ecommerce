import React from 'react'
import { Navigate} from 'react-router-dom'



function SellerPrivateRoute({children}) {
const value=sessionStorage.getItem("isSellerLoggedIn")


    
   return value === "true" ? children : <Navigate to="/gotosellerlogin"/>;
   

    


}


export default SellerPrivateRoute