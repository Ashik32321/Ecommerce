const express = require('express');
const router = express.Router();
const Project = require('../Models/ProjectModel');

router.post('/reg', (req, res) => {
  const { userphone } = req.body;
  console.log(userphone);

  Project.findOne({ userphone: userphone })
    .then(user => {
      if (user) {
        if (user.userphone === userphone) {
          res.json('user already registered');
        }
      } else {
        Project.create(req.body)
          .then(() => res.json('user registered successfully'))
          .catch(err => res.json(err));
      }
    })
    .catch(err => res.json(err));
});

module.exports = router;
