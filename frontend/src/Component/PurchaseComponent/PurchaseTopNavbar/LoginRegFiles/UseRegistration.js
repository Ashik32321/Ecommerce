// useRegistration.js

import { useState } from 'react';

const useRegistration = (initialUserDetails) => {
  const generateUserId = () => {
    // You can implement your own logic to generate a unique user ID
    // For simplicity, I'm using a basic example here (you might want to use a library)
    return Math.random().toString(36).substr(2, 9);
  };

  const [Userdetails, setUserDetails] = useState({
    ...initialUserDetails,
    userId: generateUserId() // Include a default user ID
  });

  const handleUserDetails = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value
    }));
  };

  // ... rest of the code

  return [Userdetails, handleUserDetails];
};

export { useRegistration };
