const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const Strategy  = require('passport-google-oauth20');

require("./config/passport")(passport)
//mongoose
mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));
//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({extended : false}));
//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
   }));
    app.use(passport.initialize());
    app.use(passport.session());
   //use flash
   app.use(flash());
   app.use((req,res,next)=> {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
   next();
   })
   app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(new Strategy({
    clientID: '455650895743-tb0p9h4je7g99sfud6k07drslckvmer5.apps.googleusercontent.com',
    clientSecret: 'MSz3EziPJeI5Vn237LWIYFDC',
    callbackURL: 'http://localhost:3000/google-auth/callback'
},
function (accessToken, refreshToken, profile, done) {
    // if user already exist in your dataabse login otherwise
    // save data and signup
    done(null, {});
}
));
//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

app.listen(process.env.PORT ||3000)