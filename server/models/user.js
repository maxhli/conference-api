/**
 * Created by coc on 1/27/15.
 */

// Import mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

// define the schema for our use model
var userSchema = new Schema ({
  local: {
    email: String,
    password: String
  }
});

// generate a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


// validating if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and export to app
module.exports = mongoose.model('User', userSchema);
