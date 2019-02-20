const express = require('express');
const { rejectUnauthenticated, rejectDeactivated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const axios = require('axios');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;

  const queryText = 'INSERT INTO "user" (username, password, first_name, last_name, email, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
  pool.query(queryText, [username, password, firstName, lastName, email, phone])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), rejectDeactivated, (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});


// Numverify API, this route checks if the users phone number is legitimate.
router.get('/num/:id', (req, res) => {
  let id = req.params.id;
  axios.get(`http://apilayer.net/api/validate?access_key=${process.env.NUMVERIFY_API_KEY}&number=${id}&country_code=US&format=1`)
  .then(response => {
    res.send(response.data);
    console.log(response.data);
  })
  .catch(error => {
    console.log('Error with phone verification:', error);
    res.sendStatus(500);
  })
})

module.exports = router;
