import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col } from 'react-bootstrap';

import { RiseLoader } from 'react-spinners';
import BackButton from './BackButton';
function UserInfo() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalorders ,settotalorders]=useState([])

    useEffect(() => {
        // Fetch all users from the server on component mount
        axios.get('https://ecommerce-5-74uc.onrender.com/getuser')
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => console.error('Error fetching sellers:', error));


            axios.get('https://ecommerce-5-74uc.onrender.com/getorderproducts')
      .then((response) => {settotalorders(response.data);
                           setLoading(false);})
      .catch((error) => console.error('Error fetching orders:', error));
    }, []);



    const filterOrdersByUser = (userId) => {
        if (!userId || !totalorders) {
            return [];
        }
        const trimmeduserId = userId.replace(/"/g, "").trim(); 
       
        const filteredorders = totalorders.filter(orders => {
            const orderuserID = orders.orderid.replace(/"/g, "")
            
            return orderuserID && orderuserID.trim() === trimmeduserId;
        });
       
        return filteredorders;
    };


    if (loading) {
        return <div className="loder-container ">
        <p className='text-center'>
         <RiseLoader color={'#0000FF'} loading={loading} size={15}  /><br/>
         <h6 >Loading...</h6></p>
           
     
       </div>;
    }

    return (
        <>
        <BackButton/>
        <div className="container-fluid mt-3 border  shadow-sm p-1 mb-5 bg-white ">
            <h2 className="mb-4 text-center text-primary">All Users</h2>

            <h4><strong className='me-2'>Total users :</strong>  {users.length}</h4>
            <div className='row p-3 '>
                {users.map(user => (
                    <Col key={user._id} md={4} sm={4} xs={12}  className='border border-dark d-flex justify-content-center p-3 mb-3'>
                        <div >
                        <div>
                            <div className="card-body">
                                <p className="card-text  "><strong className='text-danger me-2'>UserName :</strong>{user.username}</p>
                                <p className="card-text"><strong className='text-danger me-2'>UserID:</strong> {user.userId}</p>
                                <p className="card-text"><strong className='text-danger me-2'>Phone:</strong> {user.userphone}</p>
                                <p className="card-text"><strong className='text-danger me-2'>Total Orders:</strong> {filterOrdersByUser(user.userId).length}</p>
                            </div>
                        </div>
                        </div>
                    </Col>
                ))}
            </div>
        </div>
        </>
    );
}

export default UserInfo;
