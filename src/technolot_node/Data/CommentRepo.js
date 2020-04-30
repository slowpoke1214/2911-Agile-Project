const Comment = require('../Models/Comment');

class CommentRepo {
    CommentRepo() { }

    async getComments() {
        var comments = await Comment.find().exec()
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