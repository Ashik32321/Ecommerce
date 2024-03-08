const express = require('express');
const router = express.Router();
const Project = require("../Models/ProjectModel")

// In your server login route
router.post('/login', (req, res) => {
    const { userphone, userpassword } = req.body;

    Project.findOne({ userphone: userphone })
        .then(user => {
            if (user) {
                if (user.userpassword === userpassword) {
                    // Include userId in the response
                    res.json({ status: "success", userId: user.userId });
                } else {
                    res.json({ status: "passwordIncorrect" });
                }
            } else {
                res.json({ status: "userNotFound" });
            }
        })
        .catch(err => res.json({ status: "error", error: err }));
});


module.exports = router;