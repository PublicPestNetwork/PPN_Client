var express = require('express');
var router = express.Router();
var edit_model = require('../models/user');

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
    for (const item in edit_model.getUserData('bryan')['locations']){
        tmp_zips.push(item)
    }
    formData.zip = tmp_zips
    // Init selectedZip //
    formData.selectedZip = formData.zip[0]
}

function appendToLedger(targetUID, formData){
    console.log("APPENDING FORM DATA TO LEDGER"); 
    // Format obj for HashNet Model //
    msgData = {
        'zip':formData.selectedZip,
        'bugCount': formData.bugCount
    }
    HashNet.submitEditMessage(targetUID, msgData);
}

function updateUserData(selectedZip, targUid, uploadData){
    formData.selectedZip = selectedZip
    formData.buglist = edit_model.getUserData('bryan')['locations'][selectedZip];

    if (uploadData){
        appendToLedger(targUid, formData)
    }
}

exports.edit_form_get = function(req, res, next) {     
    
    //res.send(Add.getUserData('bryan'));
    initUserData();
    res.render('edit', { title: 'edit', data: formData });
    
}

exports.edit_form_post = function(req, res, next) {     
    
    var data = req.body;
    for (var key in req.body) {
        let value = req.body[key];
        if(key == "zip_sel"){
            formZip = value;
        } else if (key == "uid_inpt"){
            formUid = value;
        } else {
            if (value != ''){
                formData.bugCount[key.replace("_inpt", '')] = value
            }
        }
    }
    if (formData.buglist.length > 0){
        formData.readySubmit = true
    }
    updateUserData(formZip, formUid, formData.readySubmit);
    res.render('edit', { title: 'edit', data: formData });
}
