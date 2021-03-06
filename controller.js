var User = require("./models/User");
var Word = require("./models/Word");
var UserWord = require("./models/UserWord");
var auth = require("./auth");

exports.authenticate = function(req,res) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email:email}, function (err, user) {
        if (err) {
            res.json(500, err);
        }
        else if (!user) {
            res.json(401, "Unable to find User with email address " + email);
        }
        else if (user.authenticate(password)) {
            var token = auth.getToken(user);
            res.json({token:token});
        }
        else {
            res.json(401, "Invalid email/password");
        }
    });
};

exports.addWord = function(req,res) {
    /*var word = new Word(req.body);
    var definition =
    word.save(function(err, wordDoc) {

    });*/
    res.json({success:true});
};

exports.getAllWords = function(req,res) {
    res.json([
        {
            _id: 'abc123',
            word: 'Pontificate',
            added: new Date()
        },
        {
            _id: 'abc124',
            word: 'Charlatan',
            added: new Date()
        }
    ])
};

exports.register = function(req,res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = new User({email:email, password:password});
    user.save(function(err,user) {
        if (err) {
            res.json(500, err);
        } else {
            console.log("user", user);
            var token = auth.getToken(user);
            console.log("token", token);
            res.json({token: token});
        }
    });

};