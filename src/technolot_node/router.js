const cors = require('cors');
const UserController = require('./Controllers/UserController');
const PostController = require('./Controllers/PostController');
const CommentController = require('./Controllers/CommentController');
const authMiddleware = require('./authHelper');

module.exports = function(app) {
    app.post('/registerUser', cors(), UserController.RegisterUser);
    app.post('/login', cors(), authMiddleware.signIn, authMiddleware.signJWTForUser);
    app.get('/post/allPosts', cors(), PostController.GetPosts);
    app.post('/post/addPost', cors(), authMiddleware.requireJWT, PostController.AddPost);
    app.get('/post/view',cors(), CommentController.GetComments);
    app.post('/post/view',cors(),authMiddleware.requireJWT, CommentController.AddComment);
    app.get("/post/tag",cors(),PostController.GetRelatedPosts);
    app.get("/myPage",cors(),authMiddleware.requireJWT,CommentController.GetMyPage);

    app.delete("/post/delete",cors(), authMiddleware.requireJWT , PostController.DelPost);
    app.delete("/comment/delete",cors(), authMiddleware.requireJWT , CommentController.DelComment);
    app.get("/post/search",cors(), PostController.GetSearchPosts);

    app.delete("/user/delete",cors(),authMiddleware.requireJWT,UserController.DeleteUser);
    app.post("/post/update",cors(),authMiddleware.requireJWT ,PostController.UpdatePost);
    app.post("/comment/update" ,cors(), authMiddleware.requireJWT ,CommentController.UpdateComment);
}
