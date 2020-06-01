var express = require('express');
var router = express.Router();
var hash = require('hash-sdk');
var Login = require('../models/login');

/// User Input validation & sanitization ///
const validator = require('express-validator');

console.log("=============")
console.log(Login)
console.log("=============")

const networkOptions = ["testnet", "mainnet"]
accountID = ""
privateKey = ""

loginData = {
    'networkOptions': networkOptions,
    'accountID': accountID,
    'privateKey': privateKey,
    'selectedNetwork': networkOptions[0]
}

const initAccount = async (res, errors, account) => {
    try {
        errors = errors.array();
        // Setting it default to 'software' it talks to sdk directly
        // you can use other settings IF you're on the browser. 
        // Like prompt user to enter private key or mnemonic via a UI
        // As well as directly connect to Composer chrome extension
        await hash.setProvider('software');
        const accountData = {
            accountId: account.accountID,
            network: account.selectedNetwork,
            keys: {
                privateKey: account.privateKey
            }
        }
        await hash.setAccount(accountData);
        return true;
    } catch (e) {
        console.log('Error in intializing account:::', e);
        res.render('login', { title: 'Login', data: loginData, errors: e.errorString});
        return false;
    }
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
        console.log(loginData);

        (async () => {
            /// Import Wallet Info ///
            console.log("Importing wallet info....")
            if(await initAccount(res, errors, loginData)){
                console.log("Wallet info set successfully!")
                res.redirect('/user');
                /// Get Topic Info ///
                var data = new Object();
                data.topicId = "0.0.46939";
                console.log("Getting topic info " + data.topicId);  
                hash.triggerTopicInfo(data, (err,res)=>{
                if(err){
                    //error case
                    console.log('Error:::',err);
                }else{
                    //success case
                    console.log('Success:::',res);
                }
                });
            }else{
                console.log("FAIL")
            }
          })()
        //res.render('login', { title: 'Login', data: loginData });
        // Data from form is valid.
        /*
        // Check if Genre with same name already exists.
        Genre.findOne({ 'name': req.body.name })
          .exec( function(err, found_genre) {
             if (err) { return next(err); }
  
             if (found_genre) {
               // Genre exists, redirect to its detail page.
               res.redirect(found_genre.url);
             }
             else {
  
               genre.save(function (err) {
                 if (err) { return next(err); }
                 // Genre saved. Redirect to genre detail page.
                 res.redirect(genre.url);
               });
  
             }
  
           });
        */
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