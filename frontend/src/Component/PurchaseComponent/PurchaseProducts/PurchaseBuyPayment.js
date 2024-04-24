import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import BackButton from "../../OtherComponent/BackButton"
import { RiseLoader } from 'react-spinners';

const PurchaseBuyPayment = () => {
 
  const storedDataArrayString = sessionStorage.getItem('buyproducts');
  const nav = useNavigate();
  const storedDataArray = JSON.parse(storedDataArrayString);
  const [loading, setLoading] = useState(true);
  const [ploading, setpLoading] = useState(false);

  const { SellerID,productname, productimagePath,productprice} = storedDataArray;
  console.log(SellerID)
  
  const quantity = sessionStorage.getItem("quantity");

  const [Deliveryaddress, setDeliveryaddress] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/getdeliveryaddress')
      .then(response => {setDeliveryaddress(response.data)
        setLoading(false);})
      .catch(error => console.error(error));
  }, []);

  const userId = sessionStorage.getItem("userId");
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
    } else if (paymentOption === 'COD') {
      try {
        // Example using fetch
        const response = await fetch('http://localhost:3001/orders', {
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
    } else if (paymentOption === 'DebitCard') {
      setpLoading(true)
      try {
        const stripe = await loadStripe("pk_test_51P4mORSIeiQ3Pi2TbglBlZ46SfEnsJpbKLktzMDcDWauvh5ymTwqQxOUAeKPuav8Z7oEsZGBYdTe09491ABGH5t700o7UaigNI");
        const body = {
          products: [{
            "productname": productname,
            "productimagePath": productimagePath,
            "productprice": productprice,
            "productquantity": quantity
          }]
        };
        const headers = {
          "Content-Type": "application/json"
        };
        const response = await fetch("http://localhost:3001/checkout", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body)
        });
        const session = await response.json();
        const result = stripe.redirectToCheckout({
          sessionId: session.id
        });
    
        if (result.error) {
          alert('Error processing payment ');
          console.error('Stripe Error:', result.error);
        } else {
          // Payment successful with Stripe, proceed to handle order
          const orderResponse = await fetch('http://localhost:3001/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
          });
    
          const orderData = await orderResponse.json();
          console.log('Order Data:', orderData);
          setpLoading(false)
    
          
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
      {loading ? (
                    <div className="mt-5 ">
                     <p className='text-center'>
                      <RiseLoader color={'#0000FF'} loading={loading} size={15}  /><br/>
                      <h6 >Loading...</h6></p>
                        
                  
                    </div>
                ) : ( <>
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
          {Address.length === 0 ?(
            <p className='text-end'>
             <Link to="/purchasedeliveryaddress" className='btn btn-primary '>ADD</Link>
             </p>
        
      ):(<p className='text-end'>
      <Link to="/purchaseeditaddress" className='btn btn-primary '>Change</Link>
      </p>) }
       
        </Col>
        </Row></>)}
         
       
      </div>
      <div className='container  mt-5 border shadow-sm p-1 mb-5 bg-white rounded '>
      {ploading ? (
                    <div className="mt-5 ">
                     <p className='text-center'>
                      <h6 >Loading...</h6></p>
                        
                  
                    </div>
                ) : (
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
          onChange={() => handlePaymentOptionChange('COD')}
        />
        Cash on Delivery
      </label>            <br/>
        <p className='text-center'>
        <button className='btn btn-primary'   onClick={makePayment} >Make Payment</button></p>
     
      </form>)}
      </div>

    </div>
    </>
  );
};

export default PurchaseBuyPayment;
