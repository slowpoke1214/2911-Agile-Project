var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    title: {
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
    tag: {
        type: Array
    }
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;
