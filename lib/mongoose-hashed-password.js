/*!
 * mongoose-hashed-password
 * Copyright(c) 2012 Keisuke Tada <tdkskdt@gmail.com>
 * MIT Licensed
 */

var mongoose = require('mongoose'),
    crypto = require('crypto');

var Schema = mongoose.Schema;

/**
 * Add a new function to the schema prototype
 * to set a hashed password instead of a raw password
 */
Schema.prototype.defineHashedPassword = function (algorithm, validate) {
  this.add({
    hashed_password: String
  , salt: String
  });

  this.virtual('password').set(function (pw) {
    this._password = pw;
    this.salt = this.createSalt();
    this.hashed_password = this.encryptPassword(pw);
  }).get(function () {
    return this._password;
  });

  this.methods.authenticate = function (plain) {
    return this.encryptPassword(plain) === this.hashed_password;
  };

  this.methods.createSalt = function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  };

  this.methods.encryptPassword = function (str) {
    return crypto.createHmac(algorithm, this.salt).update(str).digest('hex');
  };

  this.pre('save', function (next) {
    if (validate && !validate(this.password)) return next(new Error('Invalid password'));
    next();
  });
};
