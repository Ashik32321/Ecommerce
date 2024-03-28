const express = require('express');
const router = express.Router();
const Address = require("../Models/AddressModel");

router.put('/editaddress/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedFields = req.body;

    // Constructing the update object dynamically
    let updateObject = {};
    for (let field in updatedFields) {
      if (updatedFields.hasOwnProperty(field) && updatedFields[field] !== null && updatedFields[field] !== undefined) {
        updateObject[field] = updatedFields[field];
      }
    }

    // Update the address using findOneAndUpdate
    await Address.findOneAndUpdate({ userId: userId }, updateObject);
    
    res.status(200).send('Address edited successfully.');
  } catch (error) {
    console.error('Error Editing Address:', error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
