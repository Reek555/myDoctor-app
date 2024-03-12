const express = require('express'); 
const router = express.Router();
const User  = require("../models/usersModel")
const Profile = require("../models/profileModel")
const bcrypt  = require("bcrypt")




router.post("/", async (req, res) => {

        try {
                let user = await User.findOne({
                    where: {
                        id: req.currentUser.id
                    }})

                let {userUpdates, profileUpdates} = req.body

                userUpdates.password? userUpdates.password = bcrypt.hashSync(password, 8): null
                user.set(userUpdates)
                await user.save()

                if (userUpdates.userType == "doctor") {
                        let profile = await Profile.findOne({
                            where: {
                                userId: req.currentUser.id
                            }})
                        profile.set(profileUpdates)
                        await profile.save()
                }

                res.send({success: true})

        }
        catch (err) {
                console.log(err)
                res.status(500).send({message: err})
        }

})


module.exports = router