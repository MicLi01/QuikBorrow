const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  const jwtStrategy = new JwtStrategy(opts, (jwtPayload, done) => {
    User.findById(jwtPayload.id)
        .then((user) => done(null, user || false))
        .catch(console.log);
  });

  passport.use(jwtStrategy);
};
