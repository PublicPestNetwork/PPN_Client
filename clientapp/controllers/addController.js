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
        return true;
    }
    return false;
}

function updateFormData(){
    currUser = add_model.getCurrentUser();
    //currUser = "0.0.46775"; // DEBUG
    updatedFormData = add_model.getUserData(currUser);
    console.log("=====Updated Form Data=====");
    console.log(updatedFormData);
    console.log("===========================");
    formData.zip = Object.keys(updatedFormData.locations)
    console.log(Object.keys(updatedFormData.locations));
    console.log("buglist");
    console.log(updatedFormData.locations[formData.selectedZip])
    formData.buglist = updatedFormData.locations[formData.selectedZip];
    console.log("formdata buglist");
    console.log(formData.buglist);
    console.log(updatedFormData.locations);
    console.log(formData.selectedZip);
    console.log(updatedFormData.locations[formData.selectedZip]);
    console.log("===========================");
}

exports.add_form_get = function(req, res, next) {     
    //res.send(Add.getUserData('bryan'));
    initUserData();
    updateFormData();
    firstrun = true
    res.render('add', { title: 'Add', data: formData, firstrun });
    updateFormData();
    
}

exports.add_form_post = function(req, res, next) {     
    updateFormData();
    var data = req.body;
    for (var key in req.body) {
        let value = req.body[key];
        if(key == "zip_sel"){
            formData.selectedZip = value;
        } else {
            if (value != ''){
                formData.bugCount[key.replace("_inpt", '')] = value
            }
        }
    }
    if (Object.keys(formData.bugCount).length > 0){
        formData.readySubmit = true
    }
    console.log("Before update");
    console.log(formData);
    updateFormData()
    console.log("After update");
    if (updateUserData(formData.selectedZip, formData.readySubmit)){
        formData = {
            'zip': [],
            'selectedZip': '',
            'buglist': [],
            'bugCount': {},
            'readySubmit': false
        }
        return res.redirect('/user');
    }else{
        updateFormData()
        console.log("formdata before render");
        console.log(formData);
        firstrun = false
        res.render('add', { title: 'Add', data: formData, firstrun });
    }
    
}