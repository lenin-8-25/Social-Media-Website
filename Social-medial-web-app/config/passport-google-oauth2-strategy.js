const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const { Console } = require('console');

//telling passport to use a newStrategy google-login
passport.use(new googleStrategy({
    clientID: '271432925732-hobe2jq1vvlb9h6jhcg3ti3jn63fqs1j.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'//to where the google sends the accesstoken
},
    async function (accessToken, refreshToken, profile, done) {
        //profile contains the information
        try {
            let user = await User.findOne({ email: profile.emails[0].value })
            //console.log(profile);
            console.log(accessToken, refreshToken);
            //if user found set in req.user and locals
            if (user) {
                return done(null, user);
            }
            //if user not found create user with random passowrd ans set in req.user and locals
            else {
                let user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                })
                return done(null, user);
            }
        } catch (err) {
            console.log("error in google-passportjs", err);
            return done(null, false);
        }
    }))