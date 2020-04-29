var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String
    },
    username: {
        type: String
    },
    tag: {
        type: Array
    }
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;
