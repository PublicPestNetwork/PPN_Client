var express = require('express');
var router = express.Router();
var Login = require('../models/login');
var HashNet = require('../models/hashnet.js');

/// User Input validation & sanitization ///
const validator = require('express-validator');

const networkOptions = ["testnet", "mainnet"]
accountID = ""
privateKey = ""

loginData = {
    'networkOptions': networkOptions,
    'accountID': accountID,
    'privateKey': privateKey,
    'selectedNetwork': networkOptions[0]
}

exports.init = function(req, res){
    res.render('login', { title: 'LOGIN'});
}

exports.login_form_get = function(req, res, next) {     
    //res.render('login', { title: 'Create Login' });
    res.render('login', { title: 'Login', data: loginData });
  }

  // Handle login form on POST.
exports.login_form_post =  function(req, res, next) {    
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

      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('login', { title: 'Login', data: loginData, errors: errors.array()});
        //res.render('index', { title: 'Express' });
        return;
      }
      else {
        (async () => {
            if(await HashNet.initAccount(res, errors, loginData)){
                res.redirect('/user');
                /// Get Topic Info ///  
                HashNet.getTopicInfo(); 
            }else{
                console.log("FAIL")
            }
        })()
        
      }
        
    }
/*
// Display list of all Authors.
exports.author_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Author list');
};

// Display detail page for a specific Author.
exports.author_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
};

// Display Author create form on GET.
exports.author_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create GET');
};

// Handle Author create on POST.
exports.author_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create POST');
};

// Display Author delete form on GET.
exports.author_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.author_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};
*/