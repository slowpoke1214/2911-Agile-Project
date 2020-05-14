/*
This file is for unit testing.
Mocha is the testing library being used
Chai is the assertion library being used

To run the tests, make sure you have ran "npm install" to get the latest modules.
Then just run "mocha --recursive" to run mocha and it will automatically test any file in the "test" directory
*/
process.env.NODE_ENV = 'test';

//Imported dependencies
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../src/technolot_node/app.js');

//Configuration of Chai
chai.use(chaiHttp);
chai.should();


describe('Posts', function() {
    var jwt = '';
    var username = 'UnitTest';
    var email = 'UnitTesting@test.com';
    var password = '123';
    var passwordConfirm = '123';
    var post_id = '';

    before('should register a new user', async function () {
        const res = await chai.request(app).post('/registerUser')
            .send({'username': username, 'email': email, 'password': password, 'passwordConfirm': passwordConfirm})

        expect(res).to.have.status(200);
    });

    //Activates only once at the beginning of this "describe" block.
    before('/POST "/login"', async function() {
        const res = await chai.request(app).post('/login')
            .send({'username': username, 'password': password});
        jwt = res.body.token;
    });

    after('should delete the new user that was registered.', async function () {
        const res = await chai.request(app).delete('/user/delete')
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Authorization', 'Bearer ' + jwt)
            .send({'username': username});

        expect(res).to.have.status(200);
    });

    it('/POST Creates a single Post.', async function() {
        const res = await chai.request(app).post('/post/addPost')
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Authorization', 'Bearer ' + jwt)
            .send({'title': 'Test Title', 'content': 'Test Content', 'tag': 'Test Tag'});

        //Tests to ensure correct content is received.
        expect(res.body.post.title).to.equal('Test Title');
        expect(res.body.post.content).to.equal('Test Content');
        assert.include(res.body.post.tag, 'Test Tag');

        //Tests to ensure no error message occurs.
        expect(res.body.errorMessage).to.equal('')

        //Saves the post ID for later deletion.
        post_id = res.body.post._id;

    });

    it('/GET Gets all the Posts.', async function() {
        const res = await chai.request(app)
            .get('/post/allPosts');
        let posts = res.body;
        let filteredResult = posts.filter(post => post.title == "Test Title");
        expect(filteredResult.length > 0).to.be.true;
    });

    it('/DELETE Deletion of created Post.', async function () {
        const res = await chai.request(app).delete('/post/delete?_id='+post_id)
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Authorization', 'Bearer ' + jwt);

        //Expects a successful deletion
        expect(res).to.have.status(200);
    });

});
