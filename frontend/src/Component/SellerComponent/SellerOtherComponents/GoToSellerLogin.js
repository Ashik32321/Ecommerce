import React from 'react'
import { useNavigate } from 'react-router-dom'

function GoToSellerLogin() {
    const nav =useNavigate()
  return (
    <div className='container border mt-5 bg-white'>

        <h3 className='text-center text-danger'> Oops!! Your Not logged in</h3>
        <div  className='d-flex justify-content-center'>
          <div>

        <button onClick={()=>nav("/sellerlogin") }  className="btn btn-primary ">Login</button><br/><br/>
        <button onClick={()=>nav("/sellerhome") }  className="btn  "> home</button>
        </div>
        
        </div>
    </div>
  )
}

export default GoToSellerLogin