var hash = require('hash-sdk');

const TOPICID = "0.0.46939";

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
    // TODO: Replace memo w/ hashable key? To make sure it comes from client?
    data.memo = "Official PPN Submission"
    data.topicId = TOPICID;
    data.message = messContent;
    // TODO: add a message chain system for messages longer than 4kb (1024 chars) (or maybe serialize data? ask Hteam) //
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