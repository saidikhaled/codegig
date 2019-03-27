const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


//Get gig list
router.get('/',(req, res) =>
Gig.findAll()
    .then(gigs => res.render('gigs',{gigs}))
    .catch( err => console.log(err))
)

// Display add gig form
router.get('/add',(req, res)=> res.render('add'));

//Get Add a gig
router.post('/add', (req, res )=> {
    let { title, technologies, budget, description, contact_email} = req.body;
    let errors = [];

    if(!title){
        errors.push({text:'please add a title'});
    }
    if(!technologies){
        errors.push({text:'please add technologies'});
    }
    if(!description){
        errors.push({text:'please add a description'});
    }
    if(!contact_email){
        errors.push({text:'please add a contact email'});
    }

// check for errors
    if (errors.length > 0) {
        res.render('add', {
            errors,
            title, 
            technologies, 
            budget, 
            description, 
            contact_email

        })
    } else {
        if (!budget) {
            budget = "unknown";
        } else {
            budget = `$${budget}`;
        }
        technologies = technologies.toLowerCase().replace(/, /g,',');
        
        //insert into tabel
        Gig.create({
            title,
            technologies,
            description,
            budget,
            contact_email
        })
        .then(gig => res.redirect('/gigs'))
        .catch(err => console.log(err))
        
    }
});

//Get search a gig
router.get('/search',(req, res) =>{
    const { term } = req.query;

    Gig.findAll( { where : {technologies: { [Op.like]: '%' +term + '%'  } } })
    .then(gigs => res.render('gigs', {gigs}))
    .catch(err => console.log(err))
})

module.exports = router;