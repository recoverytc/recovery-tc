const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');


const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
  console.log(`in GET eventList route`);

  let queryString = `SELECT "event"."id", "title", "venue", "date", "time", "description", "address", "image", "capacity", "attendee", "captain_id" FROM "event";`;

  pool.query(queryString)
  .then ( (result) => {
    res.send(result.rows);
  })
  .catch ( err => {
    console.log(`Error in getting event list from DB ${err}`);
    res.sendStatus(500);
  })
});


router.get('/searchevent/:id' , (req , res)=>{
  const queryString = `SELECT * FROM "event" WHERE "title" ILIKE $1; `
console.log(req.params.id);

  pool.query(queryString , [`%${req.params.id}%`])
  .then(results =>{
    res.send(results.rows)
  }).catch(error =>{
    console.log('error in search ' , error);
  })

})

module.exports = router;
