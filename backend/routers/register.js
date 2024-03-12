const express = require('express'); 
const router = express.Router();
const User  = require("../models/usersModel")
const Profile = require("../models/profileModel")
const bcrypt  = require("bcrypt")



router.post("/", async (req, res) => {

        let { name, email, password, userType, latitud, longitud, specialization, address, workingHours, phone} = req.body
        
        
        if (password != null && String(password).length >= 6) {
                password = bcrypt.hashSync(password, 8)
        }
        let user = User.build({name, email, password, userType, latitud, longitud})

        try {
                await user.save()

                if (userType == "doctor") {
                        let profile = Profile.build({userId: user.id, specialization, address, workingHours, phone})
                        await profile.save()
                }

                res.send({success: true})

        }
        catch (err) {
                console.log(err)

                let Errors = {} 
                for (let i of err.errors) {
                        Errors[i.path] = i.type == "unique violation"? "تم ادخاله سابقاً" :i.message
                }

                user.destroy()
                res.status(500).send(Errors)
        }

})


module.exports = router