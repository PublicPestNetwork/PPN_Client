/// This file normally would communicate with the DB ///
var temp = "Hello World";

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

//module.exports = ('tests', temp );

