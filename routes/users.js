//imports
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

//additional imports
const User = require('../models/user');
const config = require('../config/database');

//register route
router.post('/register' , (req ,res , next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser , (err , user)=> {
        if(err) {
            res.json({success: false , msg: 'Failed to add user'});
        } else {
            res.json({success: true , msg: 'User Registered'});
        }
    });
});

//Authenticate route
router.post('/authenticate' , (req , res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getByUserName(username , (err , user) => {
        if(err) throw err;

        if(!user) {
            return res.json({success: false , msg:'User not found'});
        }

        User.comparePassword(password , user.password , (err ,isMatch) => {
            if(isMatch) {
                const token = jwt.sign(user.toJSON() , config.secret , {
                    //toJSON method is used to convert mongoose obj to json
                    expiresIn: 604800
                });

                res.json({
                    success:true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        username: user.username                        
                    }
                });
            } else {
                return res.json({
                    success:false,
                    msg:'Wrong Password'
                });
            }
        });
    });
});

//profile route
router.get('/profile' , passport.authenticate('jwt' , {session: false}) , (req ,res, next) => {
    res.json({ user: req.user});
});

module.exports = router;