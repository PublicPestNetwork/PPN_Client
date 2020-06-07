var express = require('express');
var router = express.Router();
var hash = require('hash-sdk');
var add_model = require('../models/user');

/// User Input validation & sanitization ///
const validator = require('express-validator');

formData = {
    'zip': [45102, 45103, 40508],
    'bugs': {}
}

function initUserData() {
    for (const item of add_model.getUserData('bryan')['buglist']){
        console.log(item);
        formData.bugs[item] = null
    }
    console.log(formData);
}

exports.add_form_get = function(req, res, next) {     
    
    //res.send(Add.getUserData('bryan'));
    initUserData();
    res.render('add', { title: 'Add', data: formData });
    
}
