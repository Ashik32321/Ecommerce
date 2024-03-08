import "bootstrap/dist/css/bootstrap.min.css"
import React from 'react'
import "./App.css"
import PuchaseRoutes from './PuchaseRoutes'
import SellerRoutes from "./SellerRoutes"


function App() {
  return (
    <div>
        <PuchaseRoutes/>
        <SellerRoutes/>
    </div>
  )
}

export default App