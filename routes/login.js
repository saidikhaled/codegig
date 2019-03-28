const passport = require('passport')
const express = require('express');
const router = express.Router();
const db = require('../config/database');
//const User = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* router.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' })); */

// Display add gig form
router.get('/',(req, res)=> res.render('login'));     

//Add user

                                            

module.exports = router;