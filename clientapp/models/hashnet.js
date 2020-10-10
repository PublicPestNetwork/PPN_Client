const { contextsKey } = require('express-validator/src/base');
var hash = require('hash-sdk');

const TOPICID = "0.0.68939";

// Simple hash from string (based on Java hashCode) //
function _hashCode(str) {
    return str.split('').reduce((prevHash, currVal) =>
        (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
}


function _convertToHMess(rawData) {
    formStr = `|${rawData.zip}|`
    for (var key in rawData.bugCount) {
        let value = rawData.bugCount[key];
        formStr = formStr + `${key}:${value};`
    }
    formStr = formStr.replace(/.$/, "|"); // Replace last char w/ "|"
    hashReadyStr = Date.now().toString() + formStr;
    //console.log(_hashCode(hashReadyStr));
    return ([_hashCode(hashReadyStr), formStr]);
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
        res.render('login', { title: 'Login', data: loginData, errors: e.errorString });
        return false;
    }
}

//// Can't create topic id at address, actually need to get active from db
exports.createTopic = async () => {
    var data = new Object();
    data.topicId = TOPICID;
    console.log("Creating topic " + data.topicId);

    return await hash.triggerTopicCreate(data, (err, res) => {
        if (err) {
            if (err.error.res.name == 'BadKeyError') {
                console.log("BAD KEY ERROR")
                return false;
            } else {
                //error case
                console.log('Error:::', err);
                return false;
            }
        } else {
            //success case
            console.log('Success:::', res);
            //return true;
        }
    }).catch((error) => {
        // Bad Password
        if (error.error.res.name == 'BadKeyError') {
            console.log("BAD Private Key ERROR")
            return false;
        } else {
            console.log('Error:::', err);
            return false;
        }

    });
}

exports.getTopicInfo = async () => {
    var data = new Object();
    data.topicId = TOPICID;
    console.log("Getting topic info " + data.topicId);
    return await hash.triggerTopicInfo(data, (err, res) => {
        if (err) {
            console.log("ERROR!!!!!!! in get topic info")
            if (err.error.res.name == 'BadKeyError') {
                console.log("BAD KEY ERROR")
                return false;
            } else {
                //error case
                console.log('Error:::', err);
                return false;
            }
        } else {
            //success case
            console.log('Success:::', res);
            return true;
        }
    }).catch((error) => {
        // Bad Password
        if (error.error.res.name == 'BadKeyError') {
            console.log("BAD Private Key ERROR")
            return false;
        } else if (error.error.res.name == 'HederaPrecheckStatusError') {
            return (error.error.res.name)
        }
        else {
            console.log('Error:::', err);
            return false;
        }

    });
}

exports.submitMessage = async (messContent) => {
    var data = new Object();
    data.topicId = TOPICID;
    [data.memo, data.message] = _convertToHMess(messContent);
    if (data.message != '') {
        console.log(`Submitting Message: ${data.memo} ${data.message}`);
        data.message = `|${data.memo}${data.message}`;
        hash.triggerMessageSubmit(data, (err, res) => {
            if (err) {
                //error case
                console.log('Error:::', err);
            } else {
                //success case
                console.log('Success:::', res);
            }
        });
    } else {
        console.log("empty message");
    }
}

exports.submitEditMessage = async (prevUID, messContent) => {
    var data = new Object();
    data.topicId = TOPICID;
    [data.memo, data.message] = _convertToHMess(messContent);
    if (data.message != '') {
        data.memo = prevUID
        console.log(`Submitting Message: ${data.memo} ${data.message}`);
        data.message = `|${data.memo}${data.message}`;

        hash.triggerMessageSubmit(data, (err, res) => {
            if (err) {
                //error case
                console.log('Error:::', err);
            } else {
                //success case
                console.log('Success:::', res);
            }
        });
    } else {
        console.log("empty message");
    }
}