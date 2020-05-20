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
const app = require('../../src/technolot_node/app.js');

//Configuration of Chai
chai.use(chaiHttp);
chai.should();

const UserController = require('../../src/technolot_node/Controllers/UserController');



describe('Users', function() {
    var jwt = '';
    var username = 'UnitTest';
    var email = 'UnitTesting@test.com';
    var password = '123';
    var passwordConfirm = '123';

    it('should register a new user', async function () {
        const res = await chai.request(app).post('/registerUser')
            .send({'username': username, 'email': email, 'password': password, 'passwordConfirm': passwordConfirm})

        expect(res).to.have.status(200);
    });

    it('should Login to the newly created user.', async function () {
        const res = await chai.request(app).post('/login')
            .send({'username': username, 'password': password});
        jwt = res.body.token;

        expect(res).to.have.status(200);
    });

    it('should delete the new user that was registered.', async function () {
        const res = await chai.request(app).delete('/user/delete')
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Authorization', 'Bearer ' + jwt)
            .send({'username': username});

        expect(res).to.have.status(200);
    });
});
