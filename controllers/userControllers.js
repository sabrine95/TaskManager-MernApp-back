const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');

const register = async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
     try {
         const {email, password, name} = req.body
         const newUser = await User.findOne({email})
         if (newUser) res.status(400).json({msg:"email exist, please try to login"})
         else {
             const hashedPw = await bcrypt.hash(password, 10)
             console.log("hashedPw :", hashedPw)
             const createUser = await User.create({email, name, password: hashedPw})
             const token = await jwt.sign({id: createUser._id}, process.env.SECRET_JWT, {expiresIn: "7d"})
             res.status(201).json({msg:"user created with success", user: createUser, token: token})
         }
     } catch (error) {
         res.status(500).json({msg:"something went wrong"})
     }
 }


const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const newUser = await User.findOne({email})
        if (!newUser) res.status(400).json({msg:"email does not exist, please try to register"})
        else {
            const checkPw = await bcrypt.compare(password, newUser.password)
            if (!checkPw) res.status(400).json({msg:"invalid password or email, please try again"})
            else {
                const token = await jwt.sign({id: newUser._id}, process.env.SECRET_JWT, {expiresIn: "7d"})
                res.status(201).json({msg:"user created with success", user: newUser, token: token})
            }
        }
    } catch (error) {
        res.status(500).json({msg:"something went wrong"})
    }
}

const getUserData = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.userId})
        if (!user) res.status(400).json({msg:"user doesn't exist "})
else {
    res.status(200).json({msg:"got data", user: user})
}
    } catch (error) {
        res.status(500).json({msg:"something went wrong", error: error.message})
    }
}

module.exports = {register, login , getUserData}