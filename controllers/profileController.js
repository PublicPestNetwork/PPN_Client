var express = require('express');
var router = express.Router();
var profile_model = require('../models/user');

/// User Input validation & sanitization ///
const validator = require('express-validator');

var manageInsects = false;
var userBugs = [];
var recommendBugs = [];

function addNewZip(newZip){
    currUser = profile_model.getCurrentUser();
    //currUser = "0.0.46775"; // DEBUG
    console.log("current user: " + currUser);
    if (newZip != ''){
        profile_model.updateUserLocations(currUser, newZip);
    }
}

function updateBuglist(targetZip){

}

exports.profile_form_get = function(req, res, next) {     
    manageInsects = false;
    currUser = profile_model.getCurrentUser();
    //currUser = "0.0.46775"; // DEBUG
    userData = profile_model.getUserData(currUser);
    console.log("Userdata");
    console.log(userData)
    console.log(Object.keys(userData['locations']));
    selZip = '';
    recommendBugs = [];
    res.render('settings', { title: 'Settings', data: currUser, userData, selZip, recommendBugs });
}

exports.profile_form_post = function(req, res, next) {     
    //selZip = '';
    recommendBugs = [];
    updatedBuglist = [];
    currUser = profile_model.getCurrentUser();
    //currUser = "0.0.46775"; // DEBUG
    if (!manageInsects){
        // Add a new zipcode //
        if ((req.body.newzip_inpt).length == 4){
            console.log("adding new zip: " + req.body.newzip_inpt);
            addNewZip(req.body.newzip_inpt);
            return res.redirect('/user');
        } else {
            // Edit an existing zipcode //
            console.log("zip sel contents: " + req.body.zip_sel);
            if (req.body.zip_sel != ''){
                console.log("editing existing zipcode: " + req.body.zip_sel);
                selZip = req.body.zip_sel;
                recommendBugs = profile_model.getBuglist(selZip);
                if (recommendBugs == undefined){
                    recommendBugs = [];
                }
                userBugs = profile_model.getUserData(currUser).locations[selZip];
                console.log("user bugs for zip sel: " + userBugs);
                console.log("recommended bugs for zip sel: " + recommendBugs);
                manageInsects = true;
            }
        }
    } else {
        // Update insect list for a location //
        for (var key in req.body) {
            let value = req.body[key];
            if(key.includes('_chkbx')){
                updatedBuglist.push(key.replace("_chkbx", ''));
            } else if (key == 'newbug_inpt'){
                if (value != ''){
                    updatedBuglist.push(value);
                }
            }
        }
        console.log("PFC Selected Zip: " + selZip)
        profile_model.updateUserBuglist(currUser, selZip, updatedBuglist);
        profile_model.updaterecommendedBugList(selZip, updatedBuglist);
        return res.redirect('/user');
    }
    userData = profile_model.getUserData(currUser);

    res.render('settings', { title: 'Settings', data: currUser, userData, selZip, userBugs, recommendBugs });
}
