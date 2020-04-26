const Post = require('../Models/Post');

class PostRepo {
    PostRepo() { }

    async getPosts() {
        var posts = await Post.find().exec()
        return posts;
    }

    async addPost(post) {
        try {
            var error = await post.validateSync();
            if (error) {
                let response = {
                    obj: post,
                    errorMessage: error.message
                };
                return response;
            }

            const result = await post.save();

            let response = {
                obj: result,
                errorMessage: ''
            };

            return response

        } catch(err) {
            let response = {
                obj: post,
                errorMessage: err.message
            }
            return response;
        }
    }
}

module.exports = PostRepo;