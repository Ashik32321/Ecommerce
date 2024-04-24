import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col } from 'react-bootstrap';
import BackButton from './BackButton';
import { RiseLoader } from 'react-spinners';

function SellerInfo() {
    const [sellers, setSellers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all sellers from the server on component mount
        axios.get('http://localhost:3001/getsellerprofile')
            .then((response) => {
                setSellers(response.data);
                setLoading(false);
            })
            .catch((error) => console.error('Error fetching sellers:', error));

        // Fetch all products from the server on component mount
        axios.get('http://localhost:3001/getproducts')
            .then((response) => {
                setProducts(response.data);

                // Once products are fetched, filtering can be done
                setLoading(false);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    // Function to filter products by SellerID
   // Function to filter products by SellerID
const filterProductsBySeller = (sellerId) => {
    if (!sellerId || !products) {
        return [];
    }
    const trimmedSellerId = sellerId.replace(/"/g, "").trim(); 
    console.log(trimmedSellerId)// Remove double quotes and trim the seller ID
    const filteredProducts = products.filter(product => {
        const productSellerID = product.SellerID.replace(/"/g, "")
        console.log("product.SellerID:", product.SellerID); // Log the SellerID
        return productSellerID && productSellerID.trim() === trimmedSellerId;
    });
    console.log("Filtered Products for Seller ID", trimmedSellerId, filteredProducts);
    return filteredProducts;
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
            <h2 className="mb-4 text-center text-primary">All Sellers</h2>
            <h4><strong className='me-2'>Total sellers :</strong>  {sellers.length}</h4>
            <div className='row p-3'>
                {sellers.map(seller => (
                    <Col key={seller._id} md={6} sm={6} xs={12} className='border border-dark d-flex justify-content-center p-3 mb-3'>
                        <div >
                            <div className="card-body">
                                <p className="card-text"> <strong className='text-danger me-2'>ShopName:</strong>{seller.sellershopname}</p>
                                <p className="card-text"><strong className='text-danger me-2'>Name:</strong> {seller.sellername}</p>
                                <p className="card-text"><strong className='text-danger me-2'>Phone:</strong> {seller.sellerphone}</p>
                                <p className="card-text"><strong className='text-danger me-2'>GST:</strong> {seller.sellergst}</p>
                                <p className="card-text"><strong className='text-danger me-2'>Total Sales:</strong> {seller.totalsales}</p>
                                <p className="card-text"><strong className='text-danger me-2'>Total Products:</strong> {filterProductsBySeller(seller.sellerId).length}</p>
                                {console.log("Seller ID:", seller.sellerId)}
                            </div>
                        </div>
                    </Col>
                ))}
            </div>
        </div>
        </>
    );
}

export default SellerInfo;
