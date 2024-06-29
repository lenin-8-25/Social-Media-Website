const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
//we need to tell passport to use this local strategy

//authentication using passport
//check passport strategy website for code
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback :true
    },
    function(req, email, password, done){
   //find a user and establish a identity **https://www.passportjs.org/packages/passport-local/
        User.findOne({email: email})

        .then((user)=>{

            if(!user || user.password!=password){
                console.log('Invalid username/password');
                //here done has two arguments one is null which tells there is no error and false tells authentication false;
            //req.flash('error','Invalid Username/Password');
                return done(null,false); //authentication is false
            }

            return done(null,user);
        })



        .catch((err)=>{
            console.log('error in finding user');
                    //done can take 2 arguments but here we are just using 1
         //req.flash('error',err);
        return done(err);

        })

    }

));


//serializing the user to decide which key is to be kept in the cookies
//**
passport.serializeUser(function(user,done){
   return  done(null, user.id) // null--->error is not there
})


//deserialize the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id)
    .then((user)=>{
           return done(null,user);
    })
    .catch((err)=>{
           console.log("erorr in finding user passport");
           return done(err);
    })
})


//check if user is authenticated

passport.checkAuthentication=(req,res,next)=>{

    //if user is signed in then pass on the request to the next funxtion(controlers action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=(req,res,next)=>{
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are passing it to locals for using the user in views
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;

