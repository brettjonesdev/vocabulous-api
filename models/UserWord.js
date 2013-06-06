var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var mongooseTypes = require("mongoose-3x-types");
var useTimestamps = mongooseTypes.useTimestamps;


var UserWordSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'Users'},
    word: {type: mongoose.Schema.ObjectId, ref:'Words'},
    timesCorrect:{type:Number, default:0},
    lastSeen:{type:Date}
});

UserWordSchema.plugin(useTimestamps);

//note: mus use.populate() to ensure that user is populated, not just a ref
UserWordSchema.virtual("urgencyScore").get(function() {
    console.log("this.user: ", this.user, typeof this.user);
    var retireOn = 3;
    if (typeof this.user != mongoose.Schema.ObjectId && this.user.retireOn !== undefined) {
        console.log("retireOn", this.user.retireOn);
        retireOn = this.user.retireOn;
    }

    var score = (retireOn / this.timesCorrect) * (new Date() - this.lastSeen);
    console.log("score", score);
    return score;
});

UserWordSchema.index({word: 1});
UserWordSchema.index({user: 1});

var UserWord = mongoose.model("UserWord", UserWordSchema);
module.exports = UserWord;