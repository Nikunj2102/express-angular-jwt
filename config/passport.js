//imports
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//addtional imports
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        
        //jwt_payload contains all the information or the current user
        //console.log(jwt_payload);
      User.getById(jwt_payload._id, (err, user) => {
        if(err) {
          return done(err, false);
        }
  
        if(user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }));
  }