const asyncHandler = require('express-async-handler');
const User = require('../data/userDataModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const registerUsers = asyncHandler(async(req,res) => {
    const { username , password , email } = req.body;

    if(!username || !password  || !email ) {
        res.status(400);
         throw new Error("All fields are required");
    }
    const isUserPresent = await User.findOne({email});
    if(isUserPresent) {
        res.status(400);
        throw new Error("User is already registered");
    }

    //Hash Pasword 
    const hashedPassword = await bcrypt.hash(password, 10);

    const user  = await User.create({
        username,password: hashedPassword, email
    });

    console.log('user',user);
    if(user) {
        res.status(201).json({_id: user._id, email: user.email});
    } else {
        res.status(400);
        throw new Error("User not added")
    }
 });

 const loginUsers = asyncHandler(async(req,res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are required")
    }
    const user = await User.findOne({email});
    console.log(user, await bcrypt.compare(user.password, password));
    // compare password 
    if(user && (await bcrypt.compare( password, user.password))) {
        const accessToken = jwt.sign({user:{
            username: user.username,
            email: user.email,
            id: user.id,
        }}, process.env.API_KEY, { expiresIn: "1m"})
        res.status(200).json({accessToken})
    } else {
        res.status(401);
        throw new Error("email or password invalid")
    }
   
 });

 // used for authorization using jwt - incomplete
 const getCurrentUser = asyncHandler(async(req,res) => {
    res.status(200).send('Welcome');
 });


 module.exports = {
    registerUsers,
    loginUsers,
    getCurrentUser
 }