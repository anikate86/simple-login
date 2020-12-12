const express = require('express');
const router  = express.Router();
const passport = require('passport');
const {ensureAuthenticated} = require("../config/auth.js")
//login page
router.get('/', (req,res)=>{
    res.render('welcome');
})
//register page
router.get('/register', (req,res)=>{
    res.render('register');
})

router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{
        user: req.user
        });
    })

    router.get('/google-auth', passport.authenticate('google', {scope: ['profile']}));

    router.get('/google-auth/callback', passport.authenticate('google', {failureRedirect: '/auth/fail'}),
        (req, res, next) => {
            console.log(req.user, req.isAuthenticated());
            res.send('user is logged in');
        })
    
    router.get('/auth/fail', (req, res, next) => {
        res.send('user logged in failed');
    });
    
    router.get('/logout', (req, res, next) => {
        req.logout();
        res.send('user is logged out');
    });
    
    

module.exports = router; 