var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
