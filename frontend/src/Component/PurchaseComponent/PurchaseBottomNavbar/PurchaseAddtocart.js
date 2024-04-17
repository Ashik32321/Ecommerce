// Addtocart.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../PurchaseCssFiles/PurchaseAddtocart.css"
import BackButton from '../../OtherComponent/BackButton';
import { RiseLoader } from 'react-spinners';

const PurchaseAddtocart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3001/getcartproducts')
      .then((response) =>{ setCartItems(response.data);
                            setLoading(false);})
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const userId = sessionStorage.getItem('userId');

  const cartProducts = cartItems.filter((cartItem) => userId.includes(cartItem.userId));

  const handleIncrement = (productId) => {
    setCartItems((prevProducts) =>
      prevProducts.map((cartItem) =>
        cartItem._id === productId && cartItem.productquantity < 5
          ? { ...cartItem, productquantity: cartItem.productquantity + 1 }
          : cartItem
      )
    );
  };

  const handleDecrement = (productId) => {
    setCartItems((prevProducts) =>
      prevProducts.map((cartItem) =>
        cartItem._id === productId && cartItem.productquantity > 1
          ? { ...cartItem, productquantity: cartItem.productquantity - 1 }
          : cartItem
      )
    );
  };

  const calculateTotal = () => {
    return cartProducts.reduce(
      (total, cartItem) => total + cartItem.productprice * cartItem.productquantity,
      0
    );
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:3001/remove/${_id}`);
      alert('Item deleted successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting item:', error.message);
      alert('Server error');
    }
  };
  const dataArrayString = JSON.stringify(cartProducts);

// Store the JSON string in local storage
sessionStorage.setItem('products', dataArrayString);

  return (
    <>
    <BackButton></BackButton>
    {loading ? (
      <div className="loder-container ">
      <p className='text-center'>
       <RiseLoader color={'#0000FF'} loading={loading} size={15}  /><br/>
       <h6 >Loading...</h6></p>
         
   
     </div>
  ) : (
    <div className='container  mt-5 border shadow-sm p-5 mb-5 bg-white rounded '>
      {cartProducts.length === 0 ? (
        <div className="emptyCartMessage ">
        <img
          className="emptyCartImage"
          src="./Images/images.jpeg"
          alt="your cart is empty"
        />
        <p className='text-danger fw-bold'> Oops! your cart is empty</p><br />
        <button className='btn btn-primary' onClick={() => { nav("/") }}> Shop Now</button>
      </div>
      ) : (
        <div className='table-responsive'>
          <table className='table table-bordered shadow-sm p-1 mb-5 bg-white rounded'>
          <thead className='text-fluid'>
  <tr className='text-danger fw-bold'>
    <th className='d-none d-sm-table-cell'>Product Image</th>
    <th className='d-none d-sm-table-cell'>Product Name</th>
    <th className='d-none d-sm-table-cell'>Product Quantity</th>
    <th className='d-none d-sm-table-cell'>Product Price</th>

    {/* For mobile view, reduce the text size */}
    <th className='d-table-cell d-sm-none small-text'>Product Image</th>
    <th className='d-table-cell d-sm-none small-text'>Product Name</th>
    <th className='d-table-cell d-sm-none small-text'>Product Quantity</th>
    <th className='d-table-cell d-sm-none small-text'>Product Price</th>
  </tr>
</thead>
            <tbody>
              {cartProducts.map((cartItem) => (
                <tr key={cartItem._id}>
                  <td>
                    <p className='text-center'>
                      {cartItem.productimagePath && (
                        <img src={cartItem.productimagePath} alt={cartItem.productname} className=' mb-2 setimage' />
                      )}<br />
                      <button onClick={() => handleDelete(cartItem._id)} className='btn btn-sm btn-danger bg-danger textfont'>Remove</button>
                    </p>
                  </td>
                  <td>
                    <p className='text-fluid textfont'>{cartItem.productname}</p>
                  </td>
                  <td className='quantity-button' align='center'>
                    <button className='button1 rounded-circle bg-primary border-0 fw-bold text-white text-fluid textfont'
                      onClick={() => handleIncrement(cartItem._id)} >+</button>
                    <span className="mx-2 textfont">{cartItem.productquantity}</span>
                    <button className='button1 rounded-circle bg-primary border-0 fw-bold text-white textfont' onClick={() => handleDecrement(cartItem._id)}>-</button>
                  </td>
                  <td>
                    <p className="card-text text-success fw-bold textfont">₹{cartItem.productprice * cartItem.productquantity}</p>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" align='center' className='fw-bold text-danger textfont'>Total</td>
                <td className='text-danger fw-bold textfont'>₹{calculateTotal()}</td>
              </tr>
              <tr>
                <td colSpan="4" align='center' className='p-3'> <button className='btn btn-warning bg-warning textfont' onClick={() => nav("/purchasecartpayment")}>Checkout</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>)}
    </>
  );
};

export default PurchaseAddtocart;
