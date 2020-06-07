/// This file normally would communicate with the DB ///
var temp = "Hello World";

var userDB = {
    "users":{
        "bryan": {
            "buglist": [
                "whitefly",
                "gnat",
                "treeko",
                "ant"
            ]
        }
    },
        "0.0.46775":{
            "buglist": [
                "whitefly",
                "gnat",
                "magikarp",
                "antlion"
            ]
        }
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

