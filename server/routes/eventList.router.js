const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');


const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
  console.log(`in GETeventList route`);

  let queryString = `SELECT "id", title", "date", "time", "description", "address", "image", "capacity", "attendee" FROM "event";`;
  pool.query(queryString)
  .then ( (result) => {
    res.send(result.rows);
  })
  .catch ( err => {
    console.log(`Error in getting event list from DB ${err}`);
    res.sendStatus(500);
  })
});


module.exports = router;
