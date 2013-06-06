var crypto = require("crypto");
var User = require("./models/User");

exports.authenticate = function(req,res,next){
    var authorizationHeader = req.get("Authorization");
    if ( authorizationHeader ) {
        var header=req.headers['authorization']||'';        // get the header
        var token=header.split(/\s+/).pop()||'';            // and the encoded auth token
        var auth=new Buffer(token, 'base64').toString();    // convert from base64
        var parts=auth.split(/:/);                          // split on colon
        var userId=parts[0];
        var hashedPassword=parts[1];
        User.findOne({_id:userId}, function (err, user) {
            if (err) {
                res.json(500, err);
            }
            else if (!user) {
                res.json(401, "Unable to find User with this user id");
            }
            else if (user.hashedPassword === hashedPassword) {
                next();
            }
            else {
                res.json(401, "Invalid user/password");
            }
        });
    } else {
        res.send(401);
    }
};

exports.getToken = function(user) {
    var token = user._id + ":" + user.hashedPassword;

    return new Buffer(token).toString('base64');
};