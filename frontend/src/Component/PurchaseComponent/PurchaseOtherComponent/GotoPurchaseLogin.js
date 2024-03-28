import React from 'react'
import { useNavigate } from 'react-router-dom'

function GotoPurchaseLogin() {
    const nav =useNavigate()
  return (
    <div className='container  mt-5 border shadow-sm p-5 mb-5 bg-white rounded bg-white'>

        <h3 className='text-center text-danger text-fluid mb-3'> Oops!! Your Not logged in</h3>
        <div  className='d-flex justify-content-center'>
          <div>

        <button onClick={()=>nav("/purchaselogin") }  className="btn btn-primary ">Login</button><br/><br/>
        <button onClick={()=>nav("/") }  className="btn  "> home</button>
        </div>
        
        </div>
    </div>
  )
}

export default GotoPurchaseLogin