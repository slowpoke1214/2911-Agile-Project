const cors = require('cors');
const UserController = require('./Controllers/UserController');
const PostController = require('./Controllers/PostController');
const authMiddleware = require('./authHelper');

module.exports = function(app) {
    app.post('/registerUser', cors(), UserController.RegisterUser);
    app.post('/login', cors(), authMiddleware.signIn, authMiddleware.signJWTForUser);
    app.get('/hi', cors(), authMiddleware.requireJWT, PostController.TestPost);
    app.get('/post/allPosts', cors(), PostController.GetPosts);
    app.post('/post/addPost', cors(), authMiddleware.requireJWT, PostController.AddPost);
}
