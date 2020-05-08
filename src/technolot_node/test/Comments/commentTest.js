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


describe('Comments', function() {
    var jwt = '';
    var username = 'joek';
    var password = '123';

    before( async () => {
        const res = await chai.request(app).post('/login')
            .send({'username': username, 'password': password});
        jwt = res.body.token;
    });

    it('/GET My Page', async () => {
        const res = await chai.request(app)
            .get('/myPage')
            .set('Authorization', 'Bearer ' + jwt);
        expect(res).to.have.status(200);
    });

    after( async () => {
        //Delete the posted item from database
    })

});
