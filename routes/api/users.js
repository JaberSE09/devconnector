const express = require("express");
const User = require("../../models/User")
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
// @route   POST api/users
//@dec      Register User
//access    Public
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more charectors"
    ).isLength({ min: 6 }),
  ],
 async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {name,email, password }= req.body
    
    try {
      
    //see if user exists
    let user = await User.findOne({email})
    if(user){
      return res.status(400).json({errors: [{msg: "User already exists"}]})
    }
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm"
    })

    user = new User({
      name,
      email,
      avatar,
      password
    })    

    //encrypt password
    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)
    await user.save();
    //return jsonwebtoken


      res.send("User Registered");
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("server Error")
    }
  }
);

module.exports = router;
