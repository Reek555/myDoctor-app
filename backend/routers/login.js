const express = require('express'); 
const router = express.Router();
const User  = require("../models/usersModel")
const bcrypt  = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config()



const expiresIn = "2h"

router.post("/", async (req, res) => {
        try {
            let user = await User.findOne({where: {email: req.body.email}, raw: true})
            if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(404).send("أعد المحاولة")
            } 
            const accessToken = jwt.sign ({id: user.id, email: user.email, userType: user.userType}, process.env.SECRET, {expiresIn})
            res.send({success: true, token: accessToken})
    }
        catch (err){
            console.log(err)
            res.status(500).send({message: err})
        }

})


module.exports = router