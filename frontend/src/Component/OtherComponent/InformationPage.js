import React from 'react';
import { useNavigate } from 'react-router-dom';

import AdminNavbar from './AdminNavbar';

function InformationPage() {
    const nav = useNavigate();

  
    return (
      <>
      
      <AdminNavbar/>
        <div className="info-container  mt-5 border shadow-sm p-5 mb-5 bg-white rounded">
                      <h4 className='text-center '>Admin <br/>Dashboard</h4>
                      <div className='d-flex justify-content-center'>
                      
                      <div>
                                <button className=" btn btn-primary  w-100  mb-2" onClick={() => nav("/userinfo")}>User Info</button><br/>
                                <button className=" btn btn-primary  w-100 mb-2" onClick={() => nav("/sellerinfo")}>Seller Info</button><br/>
                                <button className="btn btn-primary  w-100 mb-2" onClick={() => nav("/adminreviewpage")}>Sales Review</button><br/>
                               
                            
                        </div>
                        </div>
                        </div>
                
        </>
    );
}

export default InformationPage;
