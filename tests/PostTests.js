var sinon = require('sinon')
var chai = require('chai');
var expect = chai.expect;
var userRoute = require('../api/routes/users')
// var assert = require('assert')
var mongoose = require('mongoose');
require('sinon-mongoose');

let user = {
  addUser: (username, email, password ) => {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
