const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth")
const Profile = require("../../models/Profile")
const User = require("../../models/User")
const { check , validationResult } = require("express-validator")
//get a single profile
router.get("/me", auth ,async (req, res) => {

try {
    
    const profile = await Profile.findOne({user: req.user.id}).populate("user", ["name" , "avatar"] )

    if(!profile){
        return res.status(400).json({msg: "there is no profile for this user"})
    }

    res.json(profile)
} catch (err) {
    console.error(err.message);
    res.status(500).send("server error")
}
  



});

//create or update a user profile

router.post("/" , [auth , 
    check("status", "Status is Required").not().isEmpty(),
    check("skills", "Skills is Required").not().isEmpty()


] , async (req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
})

module.exports = router;
