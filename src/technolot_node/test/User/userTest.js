//This file is for unit testing.
//Mocha is the testing library being used
//Chai is the assertion library being used

//To run the tests, make sure you have ran "npm install" to get the latest modules
//Then just run "mocha --recursive" to run mocha and it will automatically test any file in the "test" directory

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();


describe('Users', function() {

    it('should add two numbers', function () {
        //This is just a demo of the unit testing for Mocha and Chai
        expect(1 + 3).to.equal(4);
    });

    it('should test user Registration', function () {

    });

    it('should test user Login', function () {

    });

});
