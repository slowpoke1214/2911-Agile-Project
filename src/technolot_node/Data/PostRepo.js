const Post = require('../Models/Post');

class PostRepo {
    PostRepo() { }

    async delPost(id){
        console.log("id",id)
        var status = await Post.deleteOne({_id:id})
        return status
    }

    async getMyPosts(name){
        let posts = await Post.find({username:name}).exec()
        return posts;
    }

    async getPosts() {
        var posts = await Post.find().exec()
        return posts;
    }

    async getRelatedPosts(tag){
        var posts = await Post.find({tag:tag}).exec()
        return posts
    }

    async getOnePost(id) {
        var post = await Post.findOne({_id:id})
        return post;
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