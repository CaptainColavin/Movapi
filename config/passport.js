const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
//!!!!!!
const User = require('../models/users');
const config = require('../config/database');

module.exports = function(passport){
  let opts = {};
  // opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  //opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  //opts.jwtFromRequest = ExtractJwt.fromHeader("authorization");
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    //console.log(jwt_payload._doc);
    // User.getUserById(jwt_payload._doc._id, (err, user) => {
    // console.log(jwt_payload._id);

    User.getUserById(jwt_payload._id, (err, user) => {
        
      if(err){
        return done(err, false);
      }

      if(user){
        //console.log("user rerieved : " + user.name);
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}
