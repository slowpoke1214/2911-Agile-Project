const cors = require('cors');
const UserController = require('./Controllers/UserController');
const PostController = require('./Controllers/PostController');
const CommentController = require('./Controllers/CommentController');
const authMiddleware = require('./authHelper');

module.exports = function(app) {
    app.post('/registerUser', cors(), UserController.RegisterUser);
    app.post('/login', cors(), authMiddleware.signIn, authMiddleware.signJWTForUser);
    app.get('/hi', cors(), authMiddleware.requireJWT, PostController.TestPost);
    app.get('/post/allPosts', cors(), PostController.GetPosts);
    app.post('/post/addPost', cors(), authMiddleware.requireJWT, PostController.AddPost);
    app.get('/post/view',cors(), CommentController.GetComments);
    app.post('/post/view',cors(),authMiddleware.requireJWT, CommentController.AddComment);
    app.get("/post/tag",cors(),PostController.GetRelatedPosts)
}

