const User = require('../models/userModels');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  newUser
  .save()
  .then(newUser => {
    res.status(200).json(newUser);
  })
  .catch(err => {
    res.status(422).json({error: 'there was an error'})
  })
  // create user takes in the username and password and saves a user.
  // our pre save hook should kick in here saving this user to the DB with an encrypted password.
};

module.exports = {
  createUser
};
