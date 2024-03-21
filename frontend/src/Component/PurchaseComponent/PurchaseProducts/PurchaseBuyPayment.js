import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import BackButton from "../../OtherComponent/BackButton"

const PurchaseBuyPayment = () => {
 
  const storedDataArrayString = localStorage.getItem('buyproducts');
  const nav = useNavigate();
  const storedDataArray = JSON.parse(storedDataArrayString);

  const { SellerID,productname, productimagePath,productprice} = storedDataArray;
  console.log(SellerID)
  const totalprice = localStorage.getItem("totalprice");
  const quantity = localStorage.getItem("quantity");

  const [Deliveryaddress, setDeliveryaddress] = useState([]);
  useEffect(() => {
    axios.get('https://ecommerce-5-74uc.onrender.com/getdeliveryaddress')
      .then(response => setDeliveryaddress(response.data))
      .catch(error => console.error(error));
  }, []);

  const userId = localStorage.getItem("userId");
  const Address = Deliveryaddress.filter(ad => userId.includes(ad.userId));

  const [paymentOption, setPaymentOption] = useState(null);
  const orderDetails = {
    modeofpayment: paymentOption,
    orderid: userId,
    processed: "false",
    shipped: "false",
    delivered: "false",
    products: [{
      "SellerID": SellerID,
      "productname": productname,
      "productimagePath": productimagePath,
      "productprice": productprice,
      "productquantity": quantity,
      
    }],
  };

  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option);
  };

  const makePayment = async (e) => {
    e.preventDefault();
    if (Address.length === 0) {
      alert("Add Address");
    } else if (paymentOption === 'cod') {
      try {
        // Example using fetch
        const response = await fetch('https://ecommerce-5-74uc.onrender.com/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderDetails),
        });
        const data = await response.json();
        console.log('Data successfully sent to server:', data);
      } catch (error) {
        console.error('Error:', error);
      }

      alert('Payment successful with Cash on Delivery!');
      nav("/success");
    } else if (paymentOption === 'debitCard') {
      try {
        const stripe = await loadStripe("pk_test_51OcqX2SI1KcZYWZz4HtvKCIyK2BvfJ1edIB2cry3wWAkO4aNcdhHja8qPFnNJLBVQ0xECMahM1su42GJTV2byjGZ00HLO7kDdt");
        const body = {
          products: [{
            "productname": productname,
            "productimagePath": productimagePath,
            "productprice": totalprice,
            "productquantity": quantity
          }]
        };
        const headers = {
          "Content-Type": "application/json"
        };
        const response = await fetch("https://ecommerce-5-74uc.onrender.com/checkout", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body)
        });
        const session = await response.json();
        const result = stripe.redirectToCheckout({
          sessionId: session.id
        });
    
        if (result.error) {
          alert('Error processing payment with Stripe');
          console.error('Stripe Error:', result.error);
        } else {
          // Payment successful with Stripe, proceed to handle order
          const orderResponse = await fetch('https://ecommerce-5-74uc.onrender.com/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
          });
    
          const orderData = await orderResponse.json();
          console.log('Order Data:', orderData);
    
          
        }
      } catch (error) {
        alert('Error making payment');
        console.error('Error:', error);
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
            <div key={DAddress._id} >
              

            <p>{DAddress.username}<br/>
               {DAddress.userhno},{DAddress.uservillage}<br/>
               {DAddress.userpincode},{DAddress.userdistrict},{DAddress.userstate}<br/>
               phone:{DAddress.userphone} Alternative phone{DAddress.useraphone}
              </p>
              </div>
          
            
           

          ))}
          </Col>
          <Col>
          {Address.length === 0 && (
            <p className='text-end'>
             <Link to="/purchasedeliveryaddress" className='btn btn-primary '>ADD</Link>
             </p>
        
      ) }
       
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
          value="debitCard"
          onChange={() => handlePaymentOptionChange('debitCard')}
        />
        Debit Card
      </label><br/>
      <label>
        <input
          type="radio"
          name="paymentOption"
          value="cod"
          onChange={() => handlePaymentOptionChange('cod')}
        />
        Cash on Delivery
      </label>            <br/>
        <p className='text-center'>
        <button className='btn btn-primary'   onClick={makePayment} >Make Payment</button></p>
     
      </form>
      </div>

    </div>
    </>
  );
};

export default PurchaseBuyPayment;
