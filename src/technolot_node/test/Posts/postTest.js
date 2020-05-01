//This file is for unit testing.
//Mocha is the testing library being used
//Chai is the assertion library being used

//To run the tests, make sure you have ran "npm install" to get the latest modules
//Then just run "mocha --recursive" to run mocha and it will automatically test any file in the "test" directory

const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const PostController = require('../../Controllers/PostController');



describe('Posts', function() {

    it('should add two numbers', function () {
        //This is just a demo of the unit testing for Mocha and Chai
        expect(1 + 3).to.equal(4);
    });

    it('should test the creation of a Post', function () {

    });

    it('should test viewing of Posts', function () {

    });

    it('should test Baos new comment thing', function () {

    });

});
