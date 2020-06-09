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
var formUid = ''
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
    if (targUid != ''){
        formData.selectedZip = selectedZip
        formData.buglist = edit_model.getUserData('bryan')['locations'][selectedZip];
        if (uploadData){
            appendToLedger(targUid, formData)
            return true;
        }
        return false;
    } else {
        return false;
    }
}

function updateFormData(){
    currUser = edit_model.getCurrentUser();
    //currUser = "0.0.46775"; // DEBUG
    updatedFormData = edit_model.getUserData(currUser);
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

exports.edit_form_get = function(req, res, next) {     
    
    //res.send(Add.getUserData('bryan'));
    initUserData();
    updateFormData();
    firstrun = true;
    res.render('edit', { title: 'Edit', data: formData, firstrun });
    updateFormData();
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
    if (Object.keys(formData.bugCount).length > 0){
        formData.readySubmit = true
    }
    /*
    updateFormData();
    updateUserData(formZip, formUid, formData.readySubmit);
    updateFormData();
    firstrun = false;
    res.render('edit', { title: 'edit', data: formData, firstrun });
    */
   if (updateUserData(formZip, formUid, formData.readySubmit)){
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
        res.render('edit', { title: 'Edit', data: formData, firstrun });
    }
}
