var hash = require('hash-sdk');

const TOPICID = "0.0.46939";

// Simple hash from string (based on Java hashCode) //
function _hashCode(str) {
    return str.split('').reduce((prevHash, currVal) =>
      (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
}
  

function _convertToHMess(rawData){
    formStr = `|${rawData.zip}|`  
    for (var key in rawData.bugCount) {
        let value = rawData.bugCount[key];
        formStr = formStr + `${key}:${value};` 
    }
    formStr = formStr.replace(/.$/,"|"); // Replace last char w/ "|"
    hashReadyStr = Date.now().toString() + formStr ;
    //console.log(_hashCode(hashReadyStr));
    return([_hashCode(hashReadyStr), formStr]);
}

exports.initAccount = async (res, errors, account) => {
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


exports.getTopicInfo = async () => {
    var data = new Object();
    data.topicId = TOPICID;
    console.log("Getting topic info " + data.topicId);
    try {
        hash.triggerTopicInfo(data, (err,res)=>{
            if(err){
                //error case
                console.log('Error:::',err);
            }else{
                //success case
                console.log('Success:::',res);
            }
        });
    } catch (e) {
        console.log('Error in intializing account:::', e);
        res.render('login', { title: 'Login', data: loginData, errors: e.errorString});
        return false;
    }
}

exports.submitMessage = async (messContent) => {
    var data = new Object();
    data.topicId = TOPICID;   
    [data.memo, data.message] = _convertToHMess(messContent);
    console.log(`Submitting Message: ${data.memo} ${data.message}`);
    data.message = `|${data.memo}${data.message}`;
    hash.triggerMessageSubmit(data, (err,res)=>{
        if(err){
            //error case
            console.log('Error:::',err);
        }else{
            //success case
            console.log('Success:::',res);
        }
    });
}

exports.submitEditMessage = async (prevUID, messContent) => {
    var data = new Object();
    data.topicId = TOPICID;    
    [data.memo, data.message] = _convertToHMess(messContent);
    data.memo = prevUID
    console.log(`Submitting Message: ${data.memo} ${data.message}`);
    data.message = `|${data.memo}${data.message}`;
    hash.triggerMessageSubmit(data, (err,res)=>{
        if(err){
            //error case
            console.log('Error:::',err);
        }else{
            //success case
            console.log('Success:::',res);
        }
    });
    
}