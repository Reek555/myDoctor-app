const express = require('express'); 
const router = express.Router();
const User  = require("../models/usersModel")
const Profile = require("../models/profileModel")
const sequelize = require("sequelize")
const Op = sequelize.Op


router.get("/", async (req, res) => {
    try {
        console.log(req.query.q)
        let users  = await User.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.query.q}%`
                }, 
                userType: "doctor"
            }, 
            raw: true, 
            attributes: ["name", "latitude", "longitude"], 
            include: {model: Profile, attributes: ["address", "specialization", "phone", "workingHours"]}
        })

        res.send(users)
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = router