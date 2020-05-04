const Comment = require('../Models/Comment');

class CommentRepo {
    CommentRepo() { }

    async delComment(id){
        console.log("id",id)
        var status = await Comment.deleteOne({_id:id})
        return status
    }

    async getComments(id) {
        var comments = await Comment.find({id:id}).exec()
        return comments;
    }

    async getMyComments(name){
        var comments = await Comment.find({username:name}).exec()
        return comments;
    }

    async addComment(comment) {
        try {
            var error = await comment.validateSync();
            if (error) {
                let response = {
                    obj: comment,
                    errorMessage: error.message
                };
                return response;
            }

            const result = await comment.save();

            let response = {
                obj: result,
                errorMessage: ''
            };

            return response

        } catch(err) {
            let response = {
                obj: comment,
                errorMessage: err.message
            }
            return response;
        }
    }
}

module.exports = CommentRepo;