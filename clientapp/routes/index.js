

var hash = require('hash-sdk');
var express = require('express');
var router = express.Router();

/* https://www.npmjs.com/package/hash-sdk */ 
/* https://github.com/hashingsystems/hash.js */

/// Syncro Stuff First ///

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/// Finally Async Stuff ///

const init = async () => {
  try {
      // Setting it default to 'software' it talks to sdk directly
      // you can use other settings IF you're on the browser. 
      // Like prompt user to enter private key or mnemonic via a UI
      // As well as directly connect to Composer chrome extension
      await hash.setProvider('software');
      const accountData = {
          accountId: "0.0.46775"/*<accountId(0.0.1234)>*/,
          network: 'testnet'/*<mainnet | testnet>*/,
          keys: {
              privateKey: "302e020100300506032b657004220420eadff8c5634b37a5d1ca511ba0457f007705387c0def885ad75c1256597b1c63"/*<aplphanumeric user privatekey>*/
          }
      }
      await hash.setAccount(accountData);
      console.log("Wallet info set successfully!")
  } catch (e) {
      console.log('Error in intializing account:::', e);
      throw e;
  }
}

init();

(async () => {
  /// Import Wallet Info ///
  console.log("Importing wallet info....")
  await init();
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

/*
console.log("===== HASH =====");
console.log(hash);
console.log("================");
*/


