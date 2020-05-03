const RequestService = require('../Services/RequestService');
const CommentRepo = require('../Data/CommentRepo');
const _commentRepo = new CommentRepo();
const Comment = require('../Models/Comment')
const PostRepo = require('../Data/PostRepo');
const _postRepo = new PostRepo();
const Post = require('../Models/Post')

exports.DelComment = async function(req,res){
    let id  =  req.query._id
    let status = await _commentRepo.delComment(id)
    res.json(status)
}

exports.GetMyPage = async function(req,res){
    let name = req.user.username;
    let posts = await _postRepo.getMyPosts(name);
    let comments = await _commentRepo.getMyComments(name);
    res.json({posts,comments})
}

exports.GetComments = async function(req, res) {
    let id  =  req.query._id
    let post= await _postRepo.getOnePost(id)
    let comments = await _commentRepo.getComments(post.title)

    console.log('comments',comments,"post",post)//------------------
    res.json({comments:comments,post:post})
}

exports.AddComment = async function(req, res) {
    let reqInfo = await RequestService.jwtReqHelper(req, [])
    let time = new Date()
    if (reqInfo.authenticated) {
        let newComment = new Comment({
            title: req.body.title,
            content: req.body.content,
            username: reqInfo.username,
            time: req.body.time,
        })

        let response = await _commentRepo.addComment(newComment);

        if (response.errorMessage == '') {
            res.json({
                comment: newComment,
                errorMessage: ''
            })
        } else {
            res.json({
                comment: newComment,
                errorMessage: response.errorMessage
            })
        }
    } else {
        // Not authenticated
        res.json({
            errorMessage: 'You must logged in to create a comment.'
        })
    }
}
