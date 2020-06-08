var express = require('express');
var router = express.Router();
var add_model = require('../models/user');

var HashNet = require('../models/hashnet.js');

/// User Input validation & sanitization ///
const validator = require('express-validator');

formData = {
    'zip': [],
    'selectedZip': '',
    'bugs': [],
    'bugCount': [],
    'readySubmit': false
}

function initUserData() {
    tmp_zips = []
    // Load in zip codes //
    for (const item in add_model.getUserData('bryan')['locations']){
        console.log(item);
        tmp_zips.push(item)
    }
    formData.zip = tmp_zips
    // Init selectedZip //
    formData.selectedZip = formData.zip[0]
    console.log(formData);
}

function appendToLedger(formData){
    console.log("APPENDING FORM DATA TO LEDGER"); 
    message = formData.selectedZip.toString() + formData.bugs.toString() + formData.bugCount.toString();
    HashNet.submitMessage(message);
    /*
    hash.triggerMessageSubmit(data, (err,res)=>{
        if(err){
            //error case
            console.log('Error:::',err);
        }else{
            //success case
            console.log('Success:::',res);
        }
        console.log(err);
        console.log(res);
      });
    */
}

function updateUserData(selectedZip, uploadData){
    formData.selectedZip = selectedZip
    formData.bugs = add_model.getUserData('bryan')['locations'][selectedZip];

    if (uploadData){
        appendToLedger(formData)
    }
    console.log(formData)
}



exports.add_form_get = function(req, res, next) {     
    
    //res.send(Add.getUserData('bryan'));
    initUserData();
    res.render('add', { title: 'Add', data: formData });
    
}
exports.add_form_post = function(req, res, next) {     
    
    //res.send(Add.getUserData('bryan'));
    formZip = req.body.zip_sel;
    if (formData.bugs.length > 0){
        formData.readySubmit = true
    }
    updateUserData(formZip, formData.readySubmit);
    res.render('add', { title: 'Add', data: formData });
}