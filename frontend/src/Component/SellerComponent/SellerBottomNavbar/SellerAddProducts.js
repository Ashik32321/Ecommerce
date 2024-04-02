import React, { useState } from 'react';
import axios from 'axios';

import BackButton from '../../OtherComponent/BackButton';


function SellerAddProducts() {
  const [product, setProduct] = useState({
    productname: '',
    productdescription: '',
    productprice:'',
    productcategory:'',
    productimage: null,
    productstocked:true,
    isprocessed:false,
    isshipped:false,
    isdelivered:false,
  });
  const [loading, setLoading] = useState(false); // Corrected
 
 
  const SellerID = sessionStorage.getItem("sellerId");
  const productquantity = 1;
  
  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, productimage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('SellerID', SellerID);
    formData.append('productname', product.productname);
    formData.append('productdescription', product.productdescription);
    formData.append('productprice', product.productprice);
    formData.append('productcategory', product.productcategory);
    formData.append('productimage', product.productimage);
    formData.append('productquantity', productquantity);
    formData.append('productstocked', product.productstocked);
    formData.append('isprocessed', product.isprocessed);
    formData.append('isshipped', product.isshipped);
    formData.append('isdelivered', product.isdelivered);

    axios.post('http://localhost:3001/addproducts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
    .then(() => {
        setLoading(false);
        setProduct({
          productname: '',
          productdescription: '',
          productprice:'',
          productcategory:'',
          productimage: null,
          productstocked:true,
          isprocessed:false,
          isshipped:false,
          isdelivered:false,
      });
        alert("Product added successfully");
       
    })
    .catch(() => {
        alert('Error adding product');
    });
};



  return (
    <>
      <BackButton />
     
        <div className='login-container border border-dark  mt-3 bg-white p-3'>
          <div className='mt-3 mb-3'>
            <h4 className='text-primary text-center'>Add Product</h4>
            <div className='d-flex justify-content-center'>
              <form onSubmit={handleSubmit}>
                <label className='form-label'>Product Name:</label>
                <input type="text" 
                        name="productname" 
                        id="productname" 
                        size="25"
                        value={product.productname} 
                        onChange={handleInputChange}
                        required
                        className='form-control' />

                <label className='form-label'>Product Price:</label><br/>
                <input type="number" 
                      name="productprice"
                      id="productprice" 
                      value={product.productprice} 
                      onChange={handleInputChange}
                      required 
                      className='form-control' />

                <label className='form-label'>Product Description:</label>
                <textarea name="productdescription"
                          id="productdescription" 
                          value={product.productdescription} 
                          onChange={handleInputChange} 
                          required 
                          className='form-control' />

                <label className='form-label'>Product Category:</label><br/>
                <select name="productcategory"
                        id="productcategory" 
                        value={product.productcategory} 
                        onChange={handleInputChange} 
                        required
                        className='form-select'>
                  <option value="">None</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Toy">Toy</option>
                  <option value="Menswear">Menswear</option>
                  <option value="Womenswear">Womenswear</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Footwear">Footwear</option>
                </select>

                <label className='form-label'>Product Image:</label>
                <input type="file" 
                        name="productimage"
                        id="productimage" 
                        accept='image/*' 
                        onChange={handleImageChange} 
                        required
                        className='form-control'  /><br />
                  <>
                            {loading ? (
                  
                  <button className="btn btn-secondary w-100">Loading...</button>
               ) : (
                            <button type="submit" className="btn btn-primary w-100">Add Product</button>)}</>
              </form>
            </div>
          </div>
        </div>
     
    </>
  );
}

export default SellerAddProducts;
