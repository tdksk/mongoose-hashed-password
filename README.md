mongoose-hashed-password
========================

hashed password setter to mongoose schema

Installation
------------

    $ npm install mongoose-hashed-password

Example
-------

```javascript
require('mongoose-hashed-password');  // This module
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/test');

var schema = new mongoose.Schema({ user_id: String });
var User = db.model('User', schema);

User.defineHashedPassword('sha256');  // Define hashed password

var user = new User({ user_id: 'hoge', password: 'huga' });  // Set 'password'
console.log(user);  // { user_id: 'hoge', hashed_password: '...', salt: '...' }
console.log(user.password);  // 'huga'
user.save(function (err) {
    // ...
})
```

Add Validation
--------------

```javascript
User.defineHashedPassword('sha256', validatePassword);

function validatePassword(value) {
    return value && value.length >= 4;  // The password must be at least 4 characters long
}
```
