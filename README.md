mongoose-hashed-password
========================

hashed password setter to mongoose schema

Ezample
-------

    require('mongoose-hashed-password');
    var mongoose = require('mongoose');

    var User = new mongoose.Schema({
        user_id: String
    });

    User.setHashedPassword('sha256');

Add Validation
--------------

    User.setHashedPassword('sha256', validatePassword);

    function validatePassword(value) {
        return value && value.length >= 4;
    }
