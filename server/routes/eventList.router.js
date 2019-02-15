const express = require('express');
const { rejectUnauthenticated , rejectNonCaptain , rejectNonAdmin } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');


const router = express.Router();

// // get all events (only for testing)
// router.get('/', (req, res) => {
//   console.log(`in GET eventList route`);
//   let queryString = `SELECT * FROM "event";`;
//   pool.query(queryString)
//   .then ( (result) => {
//     res.send(result.rows);
//   })
//   .catch ( err => {
//     console.log(`Error in getting event list from DB ${err}`);
//     res.sendStatus(500);
//   })
// });

// get all events today and later
router.get('/', (req, res) => {
  // console.log(`in GET eventList route`);
  let queryString = `SELECT * FROM "event" 
  WHERE "date" >= (now() - INTERVAL '1 day') ORDER BY "date" ASC;`;
  pool.query(queryString)
    .then((result) => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`Error in getting event list from DB ${err}`);
      res.sendStatus(500);
    })
});


router.get('/searchevent/:id' , (req , res)=>{
  const queryString = `SELECT * FROM "event" WHERE "title" ILIKE $1; `

  pool.query(queryString , [`%${req.params.id}%`])
  .then(results =>{
    res.send(results.rows)
  }).catch(error =>{
    console.log('error in search ' , error);
  })

})

module.exports = router;
