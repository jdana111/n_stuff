"use strict";

var express = require('express');
var router = express.Router();

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  if (req.body.password !== req.body.password2) {
    res.status(400).render('register', {
      error: 'Passwords do not match'
    });
  } else {
    // Create a new user using req.body.username and req.body.password
    // then redirect to /login
    // YOUR CODE HERE
  }
});

var passport = require('passport');
var LocalStrategy = require('passport-local');

// Import the User model here
// YOUR CODE HERE

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // Find a user by id and call done(null, user)
  // YOUR CODE HERE
});

passport.use(new LocalStrategy(function(username, password, done) {
  // Find a user by username, if password matches call done(null, user)
  // otherwise call done(null, false)
  // YOUR CODE HERE
}));

router.use(passport.initialize());
router.use(passport.session());

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
