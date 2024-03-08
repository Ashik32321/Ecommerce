const express = require('express');
const router = express.Router();
const Project = require("../Models/ProjectModel");

router.put('/resetpassword', async (req, res) => {
  try {
    const { userphone, userpassword } = req.body;
    console.log(userphone);

    // Use findOneAndUpdate without explicit ObjectId conversion
    await Project.findOneAndUpdate({ userphone }, { userpassword });
    
    res.status(200).send('Reset successfully.');
  } catch (error) {
    console.error('Error updating product value:', error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
