

var hash = require('hash-sdk');
var express = require('express');
var router = express.Router();

/* https://www.npmjs.com/package/hash-sdk */ 
/* https://github.com/hashingsystems/hash.js */

/// Syncro Stuff First ///

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
router.get('/', function(req, res) {
  res.redirect('/login');
});


module.exports = router;

/// Finally Async Stuff ///

/*
init();

(async () => {
  /// Import Wallet Info ///
  console.log("Importing wallet info....")
  await init();
  router.get('/', function(req, res, next) {
    res.send('SUCCESS!!');
  });

  /// Get Topic Info ///
  var data = new Object()
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
})()
*/
/*
console.log("===== HASH =====");
console.log(hash);
console.log("================");
*/


