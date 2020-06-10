/// This file normally would communicate with the DB ///
var temp = "Hello World";

var currentUser = '';

var userDB = {
    "users":{
        "bryan": {
            "locations":{
                "4510":['gnat', 'thrip', 'wasp'],
                "4050":['whitefly', 'gnat', 'ant']
            }
        },
        "0.0.46775":{
            "locations":{
                "4510":['gnat', 'thrip', 'wasp'],
                "4050":['whitefly', 'gnat', 'ant']
            }
        }
    }
}

var bugDB = {
    "4510":['whitefly', 'gnat', 'firefly'],
    "4050":['dragonfly', 'ant', 'flea']
}
console.log(userDB);

exports.getUserData = function(uid) {
    if(userDB.users.hasOwnProperty(uid)){
        return userDB.users[uid];
    } else {
        return false
    }
};

exports.setCurrentUser = function(userName){
    currentUser = userName;
}

exports.getCurrentUser = function(){
    return currentUser;
}

exports.updateUserLocations = function(userName, newZip){
    console.log("Newzip: " + newZip);
    userDB.users[userName].locations[newZip] = []
    console.log(userDB.users[userName].locations);
}

exports.getBuglist = function(targetZip){
    console.log(bugDB[targetZip]);
    return bugDB[targetZip];
}

exports.updateUserBuglist = function(userName, targZip, newBuglist){
    userDB.users[userName].locations[targZip] = newBuglist;
    console.log("username: " + userName);
    console.log("targZip: " + targZip);
    console.log("newBugList: " + newBuglist);
    console.log("UserDB");
    console.log(userDB.users[userName].locations);
    console.log(userDB.users[userName].locations[targZip]);
}

exports.updaterecommendedBugList = function(targZip, newBuglist){
    bugDB[targZip] = newBuglist;
    console.log("BugDB");
    console.log(bugDB[targZip]);
}
//module.exports = ('tests', temp );

