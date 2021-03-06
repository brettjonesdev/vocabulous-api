var mongoose = require('mongoose');
var crypto = require('crypto');
var ObjectID = require('mongodb').ObjectID;
var mongooseTypes = require("mongoose-3x-types");
var useTimestamps = mongooseTypes.useTimestamps;

var UserSchema = new mongoose.Schema({
    email: { type:mongoose.Schema.Types.Email, unique: true, required: true },
    retireOn: {type:Number, default: 3},
    promptFrequency: {type:String,enum:["Never","Occasionally","Frequently"], default: "Occasionally"}
});

 UserSchema.virtual('password')
 .set(function(password) {
 this._password = password;
 this.salt = this.makeSalt();
 this.hashedPassword = this.encryptPassword(password)
 })
 .get(function() { return this._password });

UserSchema.plugin(useTimestamps);

UserSchema.index({email: 1});

//instance methods
UserSchema.methods = {
    authenticate: function(plainText) {
        return (( this.encryptPassword(plainText) === this.hashedPassword) && this.active);
    },

    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    encryptPassword: function(password) {
        if (!password) return '';
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    }
};

//static methods
UserSchema.statics.generateTempAuthCode = function() {
    var code = new ObjectID();
    return code.toString();
};

var User = mongoose.model("User", UserSchema);

module.exports = User;