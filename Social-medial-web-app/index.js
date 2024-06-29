const express = require('express')
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie  or authenticarion
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// //use express router

// app.use('/', require('./routes'));

//set up view engine

app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the sessioon cookie in the db
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blhhblhh',
    saveUninitialized:false,
    resave:false,
    cookie:
    {
        maxAge : (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl : 'mongodb://127.0.0.1:27017/codeial_development',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err);
            return;
        })

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);//this fn is automatically called as middleware

app.use(flash());
app.use(customMware.setFlash);

//use express router

app.use('/', require('./routes'));

app.listen(port,(err)=>{

    if(err){
        //console.log('Error: ', err)
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`)
    return;
});