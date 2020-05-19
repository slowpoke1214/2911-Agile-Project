const Post = require('../Models/Post');

class PostRepo {
    PostRepo() { }

    async getSearchPosts(search){
        let titles = await Post.find({title:{$regex: search, $options: "$i"}}).exec()
        let contents = await Post.find({content:{$regex: search, $options: "$i"}}).exec()
        let tags = await Post.find({tag:{$regex: search, $options: "$i"}}).exec()
        return {titles,contents,tags};
    }

    async delPost(id){
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

    async updatePost(id, content) {
        var post = await Post.updateOne({_id: id},{
            $set: {
                content: content
            }
        })
        return post
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