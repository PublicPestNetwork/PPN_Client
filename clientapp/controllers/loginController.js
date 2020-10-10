var express = require('express');
var router = express.Router();
var Login = require('../models/login');
var HashNet = require('../models/hashnet.js');
var user_model = require('../models/user');

/// User Input validation & sanitization ///
const validator = require('express-validator');
const { contextsKey } = require('express-validator/src/base');

const networkOptions = ["testnet", "mainnet"]
accountID = ""
privateKey = ""

loginData = {
    'networkOptions': networkOptions,
    'accountID': accountID,
    'privateKey': privateKey,
    'selectedNetwork': networkOptions[0]
}

exports.init = function (req, res) {
    res.render('login', { title: 'LOGIN' });
}

exports.login_form_get = function (req, res, next) {
    //res.render('login', { title: 'Create Login' });
    res.render('login', { title: 'Login', data: loginData });
}

failed_login = function (req, res, next) {
    console.log("LOGIN FAILED@")
    res.render('login', { title: 'Login', data: loginData });
}

async function initAccount(req, res, next) {

    if (await HashNet.initAccount(res, errors, loginData)) {
        user_model.setCurrentUser(loginData.accountID);
        console.log("Getting topic info....");
        const resp = await HashNet.getTopicInfo();
        if (resp == false) {
            console.log('Login failed...');
            res.redirect('/login');
        } else {
            res.redirect('/user');
        }

    }

}

// Handle login form on POST.
exports.login_form_post = function (req, res, next) {
    // Validate that the fields are not empty.

    validator.check('acctId_inpt').isLength({ min: 1 });
    validator.check('privKey_inpt', 'Private Key required').isLength({ min: 1 });
    // Sanitize (escape) the fields.
    validator.body('acctId_inpt').escape();
    validator.body('privKey_inpt').escape();

    // Extract the validation errors from a request.
    errors = validator.validationResult(req);

    loginData.accountID = req.body.acctId_inpt
    loginData.selectedNetwork = req.body.ntwrk_sel;
    loginData.privateKey = req.body.privKey_inpt;

    console.log("GETTING TOPIC INFO");
    if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('login', { title: 'Login', data: loginData, errors: errors.array() });
        //res.render('index', { title: 'Express' });
        return;
    }
    else {
        initAccount(req, res, next).catch(error => { "hello world" });
    }
    console.log("GETTING TOPIC INFO");

}
