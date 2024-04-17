const express = require('express');
const router =express.Router();
const Project = require("../Models/ProjectModel")

router.get('/getuser', async (req, res) => {
    try {
      const users = await Project.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;