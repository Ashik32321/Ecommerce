import { useState } from 'react';

const UseSellerRegistration = (initialSellerDetails) => {
  const generateSellerId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const [sellerDetails, setSellerDetails] = useState({
    ...initialSellerDetails,
    sellerId: generateSellerId()
  });

  const handleSellerDetails = (e) => {
    const { name, value } = e.target;
    setSellerDetails((prevSellerDetails) => ({
      ...prevSellerDetails,
      [name]: value
    }));
  };

  return [sellerDetails, handleSellerDetails];
};

export { UseSellerRegistration };
