const RequestService = require('../Services/RequestService');
const PostRepo = require('../Data/PostRepo');
const _postRepo = new PostRepo();
const Post = require('../Models/Post')


exports.DelPost = async function(req,res){
    let reqInfo = await RequestService.jwtReqHelper(req, []);
    if (reqInfo.authenticated) {
        let id = req.query._id;
        let status = await _postRepo.delPost(id);
        res.json({status:status, errorMessage:""});
    }else{
        res.json({errorMessage:"Not authenticated!"})
    }
}

exports.GetUserInfo = async function(req,res){
    res.json({user:req.user})
}

exports.GetRelatedPosts = async function(req,res){
    let tag = req.query.tag;
    let posts = await _postRepo.getRelatedPosts(tag);
    res.json(posts)
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

