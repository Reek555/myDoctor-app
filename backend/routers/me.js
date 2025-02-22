const express = require('express'); 
const router = express.Router();
const User = require ("../models/usersModel")
const Profile = require("../models/profileModel")





router.get("/", async (req, res) => {
    try {
        let user  = await User.findAll({
            where: {
                id: req.currentUser.id 
            }, 
            raw: true, 
            attributes: ["name", "email"],
            include: req.currentUser.userType == "doctor"? {model: Profile, attributes: ["specialization","workingHours", "address", "phone"]} : null
        })
        res.send(user)
        console.log(typeof(user))


        
    }
    catch (err){
        res.status(500).send({msg: err})
    }
})

module.exports = router