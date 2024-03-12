const express = require('express'); 
const router = express.Router();
const User  = require("../models/usersModel")



//not sure if corresponding profile gets deleted

router.get("/", async (req, res) => {

    try {
        let user = await User.findOne({where: {
            id: req.currentUser.id
        }})
        user.destroy()
        res.send({success: true})
    }
    catch (err) {
        console.log (err)
        res.status(500).send(err)
    }
})

module.exports = router