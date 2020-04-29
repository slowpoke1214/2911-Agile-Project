const RequestService = require('../Services/RequestService');
const PostRepo = require('../Data/PostRepo');
const _postRepo = new PostRepo();
const Post = require('../Models/Post')

exports.TestPost = async function(req, res) {
    let reqInfo = await RequestService.jwtReqHelper(req, []);
    if (reqInfo.authenticated) {
        res.json({'message':'ok'});
    }
}

exports.GetPosts = async function(req, res) {
    let posts = await _postRepo.getPosts()
    res.json(posts)
}

exports.AddPost = async function(req, res) {
    let reqInfo = await RequestService.jwtReqHelper(req, [])
    if (reqInfo.authenticated) {
        let newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            username: reqInfo.username,
            tag: req.body.tag
        })

        let response = await _postRepo.addPost(newPost);

        if (response.errorMessage == '') {
            console.log(newPost)//------------------------
            res.json({
                post: newPost,
                errorMessage: ''
            })
        } else {
            res.json({
                post: newPost,
                errorMessage: response.errorMessage
            })
        }
    } else {
        // Not authenticated
        res.json({
            errorMessage: 'You must logged in to create a post.'
        })
    }
}

