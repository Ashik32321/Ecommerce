//payment.js

import React,{useState,useEffect  } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import {  Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {loadStripe} from "@stripe/stripe-js"
import BackButton from '../../OtherComponent/BackButton';






const PurchaseCartPayment = () => {
  
  const nav=useNavigate()

  const [isPaymentCompleted, setPaymentCompleted] = useState(false);
  const storedDataArrayString = localStorage.getItem('products');
  

// Parse the JSON string back to an array
const storedDataArray = JSON.parse(storedDataArrayString);

  const [Deliveryaddress,setDeliveryaddress]=useState([])
  const [loading, setLoading] = useState(true);

           
       
  useEffect(() => {
    axios.get('https://ecommerce-5-74uc.onrender.com/getdeliveryaddress')
       .then(response => {
          setDeliveryaddress(response.data);
          setLoading(false);
       })
       .catch(error => console.error(error));
 }, []);
 
    const userId=localStorage.getItem("userId")
const Address = Deliveryaddress.filter(ad => userId.includes(ad.userId));


  const [paymentOption, setPaymentOption] = useState(null);
  const orderDetails = {
    
    modeofpayment: paymentOption,
    orderid: userId,
    processed: "false",
    shipped: "false",
    delivered: "false",
    products:storedDataArray ,
  };

const phone1=storedDataArray

console.log(phone1)

  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option);
  };

  const makePayment = async (e) => {
    e.preventDefault();
    if (Address === undefined || Address.length === 0) {
      alert("Add Address");
   }
   else if (paymentOption === 'Cod') {
   // Example using fetch
fetch('http://localhost:3001/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(orderDetails ),
})
  .then(response => response.json())
  .then(data => console.log('Data successfully sent to server:', data))
  .catch(error => console.error('Error:', error));
  setPaymentCompleted(true);
  localStorage.setItem("pdone",isPaymentCompleted)
  alert('Payment successful with Cash on Delivery!');
  nav("/success")

    } else if (paymentOption === 'DebitCard') {
       try {
          const stripe = await loadStripe("pk_test_51OcqX2SI1KcZYWZz4HtvKCIyK2BvfJ1edIB2cry3wWAkO4aNcdhHja8qPFnNJLBVQ0xECMahM1su42GJTV2byjGZ00HLO7kDdt");
          const body = {
             products: storedDataArray
          }
          const headers = {
             "Content-Type": "application/json"
          }
          const response = await fetch("http://localhost:3001/checkout", {
             method: "POST",
             headers: headers,
             body: JSON.stringify(body)
          });
          const session = await response.json();
          const result = stripe.redirectToCheckout({
             sessionId: session.id
          });


          fetch('http://localhost:3001/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(orderDetails ),
})
  .then(response => response.json())
  .then(data => console.log('Data successfully sent to server:', data))
  .catch(error => console.error('Error:', error));
  setPaymentCompleted(true);
  localStorage.setItem("pdone",isPaymentCompleted)


          if (result.error) {
             console.log(result.error);
          }
       } catch (error) {
          alert('Error making payment');
       }
       

    } else {
       alert('Please select a payment option before making payment.');
    }
 };
 

  



  

  




  return (

    <>
    <BackButton></BackButton>
    <div>
      <div className='container  mt-5 border shadow-sm p-1 mb-5 bg-white rounded '>
        <h6>Delivery Address</h6>
        <Row>
          <Col>
          {Address.map((DAddress) =>(
             <div>
             {loading ? (
                <p>Loading...</p>
             ) : (
                <>
                  <div key={DAddress._id} >

<p>{DAddress.username}<br/>
   {DAddress.userhno},{DAddress.uservillage}<br/>
   {DAddress.userpincode},{DAddress.userdistrict},{DAddress.userstate}<br/>
   phone:{DAddress.userphone} Alternative phone{DAddress.useraphone}
  </p>
  </div>
 
                </>
             )}
          </div>
           
            
           

          ))}
          </Col>
          <Col>
          <p className='text-end'>

          {Address.length === 0 && (
             <Link to="/purchasedeliveryaddress" className='btn btn-primary'>ADD</Link>
        
      ) }
       
        </p>
        </Col>
        </Row>
       
      </div>
      <div className='container  mt-5 border shadow-sm p-1 mb-5 bg-white rounded '>
      <form>
        <h6> Method of Payment</h6>

 
           
        <label>
        <input
          type="radio"
          name="paymentOption"
          value="DebitCard"
          onChange={() => handlePaymentOptionChange('DebitCard')}
        />
        Debit Card
      </label><br/>
      <label>
        <input
          type="radio"
          name="paymentOption"
          value="cod"
          onChange={() => handlePaymentOptionChange('Cod')}
        />
        Cash on Delivery
      </label>            <br/>
        <p className='text-center'>
        <button className='btn btn-warning'   onClick={makePayment} >Make Payment</button></p>
     
      </form>
      </div>

    </div>
    </>
  );
};

export default PurchaseCartPayment;
