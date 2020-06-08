var express = require('express');
var router = express.Router();
var add_model = require('../models/user');

var HashNet = require('../models/hashnet.js');

/// User Input validation & sanitization ///
const validator = require('express-validator');

formData = {
    'zip': [],
    'selectedZip': '',
    'buglist': [],
    'bugCount': {},
    'readySubmit': false
}

function initUserData() {
    tmp_zips = []
    // Load zip codes //
    for (const item in add_model.getUserData('bryan')['locations']){
        tmp_zips.push(item)
    }
    formData.zip = tmp_zips
    // Init selectedZip //
    formData.selectedZip = formData.zip[0]
}

function appendToLedger(formData){
    console.log("APPENDING FORM DATA TO LEDGER"); 
    // Format obj for HashNet Model //
    msgData = {
        'zip':formData.selectedZip,
        'bugCount': formData.bugCount
    }
    HashNet.submitMessage(msgData);
}

function updateUserData(selectedZip, uploadData){
    formData.selectedZip = selectedZip
    formData.buglist = add_model.getUserData('bryan')['locations'][selectedZip];

    if (uploadData){
        appendToLedger(formData)
    }
}



exports.add_form_get = function(req, res, next) {     
    
    //res.send(Add.getUserData('bryan'));
    initUserData();
    res.render('add', { title: 'Add', data: formData });
    
}

exports.add_form_post = function(req, res, next) {     
    
    var data = req.body;
    for (var key in req.body) {
        let value = req.body[key];
        if(key == "zip_sel"){
            formZip = value;
        } else {
            if (value != ''){
                formData.bugCount[key.replace("_inpt", '')] = value
            }
        }
    }
    if (formData.buglist.length > 0){
        formData.readySubmit = true
    }   
    console.log(formData);
    updateUserData(formZip, formData.readySubmit);
    /*
    data.forEach(function (item) {
        console.log(item.id);
        console.log(item.Name);
    });
    */
    //res.send(Add.getUserData('bryan'));
    /*
    var formZip = req.body.zip_sel;
    var formContent = req.body;
    if (formData.buglist.length > 0){
        //formData.readySubmit = true
        formContent.forEach(function (item) {
            console.log(item.id);
            console.log(item.Name);
        });
    }
    updateUserData(formZip, formData.readySubmit);
    */
    res.render('add', { title: 'Add', data: formData });
}