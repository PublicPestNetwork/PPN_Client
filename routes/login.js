var express = require('express');
var router = express.Router();

var login_controller = require('../controllers/loginController')

// Home page route.
router.get('/', function (req, res) {
    //res.redirect('/login');
    //res.render('login', { title: 'Express' });
    
    //login_controller.init(req, res);
    login_controller.login_form_get(req, res)
  })

// HTTP Requests
router.post('/', function (req, res) {
    login_controller.login_form_post(req, res)
  })

/*
// Home page route.
router.get('/', function (req, res) {
  res.send('home page');
})

// About page route.
router.get('/about', function (req, res) {
  res.send('About this page');
})

// HTTP Requests
router.post('/about', function (req, res) {
    res.send('About this wiki');
  })
*/
module.exports = router;
