//Imports
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//secondary imports
const config = require('../config/database');

//User schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//define and export User models
const User = module.exports = mongoose.model('Users' , userSchema);

//functions
module.exports.getById = function(id , callback) {
    User.findById(id , callback);
}

module.exports.getByUserName = function(username , callback) {
    const query = {
        username: username
    };

    User.findOne(query , callback);
}

//hashes password and then saves the user in the database
module.exports.addUser = function(newUser , callback) {
    bcrypt.genSalt(10 , (err , salt) => {
        bcrypt.hash(newUser.password , salt , (err , hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword , hash , callback) {
    bcrypt.compare(candidatePassword , hash , (err , isMatch) => {
        if(err) throw err;
        callback(null , isMatch);
    });
}