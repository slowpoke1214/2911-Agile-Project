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

const UserController = require('../../Controllers/UserController');



describe('Users', function() {

    it('should add two numbers', function () {
        //This is just a demo of the unit testing for Mocha and Chai
        expect(1 + 3).to.equal(4);
    });

    it('should test user Registration', function () {

    });

});
