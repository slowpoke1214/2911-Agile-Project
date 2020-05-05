/*
This file is for unit testing.
Mocha is the testing library being used
Chai is the assertion library being used

To run the tests, make sure you have ran "npm install" to get the latest modules.
Then just run "mocha --recursive" to run mocha and it will automatically test any file in the "test" directory
*/

//Imported dependencies
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../../app.js');

//Configuration of Chai
chai.use(chaiHttp);
chai.should();



describe('Posts', function() {
    var jwt = '';
    var username = 'joek';
    var password = '123';

    beforeEach( async () => {
        res = await chai.request(app).post('/login')
            .send({'username': username, 'password': password});
        jwt = res.body.token;
    });

    it('/POST', async () => {
        const res = await chai.request(app).post('/post/addPost')
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Authorization', 'Bearer ' + jwt)
            .send({'title': 'Test Title', 'content': 'Test Content', 'tag': 'Test Tag'});

        //Tests to ensure correct content is received.
        expect(res.body.post.title).to.equal('Test Title');
        expect(res.body.post.content).to.equal('Test Content');
        assert.include(res.body.post.tag, 'Test Tag', 'nice');

        //Tests to ensure no error message occurs.
        expect(res.body.errorMessage).to.equal('')
    });

    it('/GET', async () => {
        const res = await chai.request(app)
            .get('/post/allPosts');
        let posts = res.body;
        let filteredResult = posts.filter(post => post.title == "Test Title");
        expect(filteredResult.length > 0).to.be.true;
    });

    afterEach( async () => {
        //Delete the posted item from database
    })

});

