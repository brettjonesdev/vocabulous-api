var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var mongooseTypes = require("mongoose-3x-types");
var useTimestamps = mongooseTypes.useTimestamps;


var UserWordSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'Users'},
    word: {type: String},
    retiredDate: Date,
    history: [
        {
            date: Date,
            success: Boolean
        }
    ]
});

UserWordSchema.plugin(useTimestamps);

UserWordSchema.index({word: 1});
UserWordSchema.index({user: 1});

var UserWord = mongoose.model("UserWord", UserWordSchema);
module.exports = UserWord;