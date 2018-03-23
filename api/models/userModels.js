const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 11;

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    hidden: true,
  },
  // create your user schema here.
  // username: required, unique and lowercase
  // password: required
});

UserSchema.pre('save', function(next) {
  bcrypt
    .hash(this.password, SALT_ROUNDS)
    .then( res => {
      this.password = res});
      next();
    });
// UserSchema.pre('save', function(next) {
//   bcrypt
//   .hash(password, SALT_ROUNDS)
//   .then(res => {
//     res.json(res) 
//   })
//   next();
// });

  // https://github.com/kelektiv/node.bcrypt.js#usage
  // Fill this middleware in with the Proper password encrypting, bcrypt.hash()
  // if there is an error here you'll need to handle it by calling next(err);
  // Once the password is encrypted, call next() so that your userController and create a user


// UserSchema.methods.checkPassword = function(plainTextPW, callBack) {
UserSchema.methods.checkPassword = function(password, cb) {
    let user = this;
    bcrypt.compareSync(password, user.password)
    .then( matched => {
      res.json({ success: true })
    })
    .catch( matched => res.send({ failure: "pwds_dont_match" }))
  };
  // https://github.com/kelektiv/node.bcrypt.js#usage
  // Fill this method in with the Proper password comparing, bcrypt.compare()
  // Your controller will be responsible for sending the information here for password comparison
  // Once you have the user, you'll need to pass the encrypted pw and the plaintext pw to the compare function

// if you're really stuck with this at this point, you can reference this document.
// https://github.com/LambdaSchool/Auth-JWT/blob/master/models/index.js This is what we're going for here.

module.exports = mongoose.model('User', UserSchema);
