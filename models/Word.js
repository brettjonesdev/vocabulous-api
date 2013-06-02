var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var mongooseTypes = require("mongoose-3x-types");
var useTimestamps = mongooseTypes.useTimestamps;

var WordSchema = new mongoose.Schema({
    word: {type:String, unique:true},
    partOfSpeech:{type:String},
    definition:{type:String, required:true},
    source:String
});

WordSchema.plugin(useTimestamps);

WordSchema.index({word: 1});

var Word = mongoose.model("Word", WordSchema);
module.exports = Word;