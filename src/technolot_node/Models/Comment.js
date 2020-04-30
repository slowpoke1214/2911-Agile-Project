var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = new Schema({
    title: {
        type: String,
    },
    content: {
        type: String
    },
    username: {
        type: String
    },
    time: {
        type: String
    }
});

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
