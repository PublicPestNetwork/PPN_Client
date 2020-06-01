var express = require('express');
var router = express.Router();
var hash = require('hash-sdk');
var Add = require('../models/user');

/// User Input validation & sanitization ///
const validator = require('express-validator');

exports.add_form_get = function(req, res, next) {     
    
    res.send(Add.getUserData('bryan'));
    //res.render('add', { title: 'Add', data: "hello " });
    
}
