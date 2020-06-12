/// This file normally would communicate with the DB ///
var temp = "Hello World";

var currentUser = '';

var userDB = {
    "users":{
        "bryan": {
            "locations":{
                "4510":['thrip', 'whitefly', 'fungus gnat', 'aphid', 'spider mite', 'shorefly', 'parasitic wasp', 'ant', 'sweat bee', 'crane fly'],
                "4050":['thrip', 'whitefly', 'fungus gnat', 'aphid', 'spider mite', 'shorefly', 'parasitic wasp', 'ant', 'sweat bee', 'crane fly'],
                "4035":['thrip', 'whitefly', 'fungus gnat', 'aphid', 'spider mite', 'shorefly', 'parasitic wasp', 'ant', 'sweat bee', 'crane fly']
            }
        },
        "0.0.46775":{
            "locations":{
                "4510":['thrip', 'whitefly', 'fungus gnat', 'aphid', 'spider mite', 'shorefly', 'parasitic wasp', 'ant', 'sweat bee', 'crane fly'],
                "4050":['thrip', 'whitefly', 'fungus gnat', 'aphid', 'spider mite', 'shorefly', 'parasitic wasp', 'ant', 'sweat bee', 'crane fly'],
                "4035":['thrip', 'whitefly', 'fungus gnat', 'aphid', 'spider mite', 'shorefly', 'parasitic wasp', 'ant', 'sweat bee', 'crane fly']
            }
        },
        "0.0.65179":{
            "locations":{
                "4510":['thrip', 'whitefly', 'fungus gnat', 'aphid', 'spider mite', 'shorefly', 'parasitic wasp', 'ant', 'sweat bee', 'crane fly'],
                "4050":['thrip', 'whitefly', 'fungus gnat', 'aphid', 'spider mite', 'shorefly', 'parasitic wasp', 'ant', 'sweat bee', 'crane fly'],
                "4035":['thrip', 'whitefly', 'fungus gnat', 'aphid', 'spider mite', 'shorefly', 'parasitic wasp', 'ant', 'sweat bee', 'crane fly']
            }
        },
        "default":{
            "locations":{
                "4510":['thrip', 'whitefly', 'fungus gnat', 'aphid', 'spider mite', 'shorefly', 'parasitic wasp', 'ant', 'sweat bee', 'crane fly'],
                "4050":['thrip', 'whitefly', 'fungus gnat', 'aphid', 'spider mite', 'shorefly', 'parasitic wasp', 'ant', 'sweat bee', 'crane fly'],
                "4035":['thrip', 'whitefly', 'fungus gnat', 'aphid', 'spider mite', 'shorefly', 'parasitic wasp', 'ant', 'sweat bee', 'crane fly']
            }
        }  
    }
}

var bugDB = {
    "4510":['firefly', 'thrip', 'whitefly', 'fungus gnat', 'aphid', 'spider mite', 'shorefly', 'parasitic wasp', 'ant', 'sweat bee', 'crane fly'],
    "4050":['dragonfly', 'thrip', 'whitefly', 'fungus gnat', 'aphid', 'spider mite', 'shorefly', 'parasitic wasp', 'ant', 'sweat bee', 'crane fly'],
    "4035":['mothra', 'thrip', 'whitefly', 'fungus gnat', 'aphid', 'spider mite', 'shorefly', 'parasitic wasp', 'ant', 'sweat bee', 'crane fly']
}
console.log(userDB);

exports.getUserData = function(uid) {
    if(userDB.users.hasOwnProperty(uid)){
        return userDB.users[uid];
    } else {
        return userDB.users['default'];
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
    if(userDB.users.hasOwnProperty(userName)){
        pass
    } else {
        userName = 'default';
    }
    userDB.users[userName].locations[newZip] = []
    console.log(userDB.users[userName].locations);
}

exports.getBuglist = function(targetZip){
    console.log(bugDB[targetZip]);
    return bugDB[targetZip];
}

exports.updateUserBuglist = function(userName, targZip, newBuglist){
    if(userDB.users.hasOwnProperty(userName)){
        pass
    } else {
        userName = 'default';
    }
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

