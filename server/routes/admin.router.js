const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/getUsers', (req, res) => {
  let queryText = `SELECT "first_name", "last_name", "username", "email", "phone", "captain", "active", "id" FROM "user";`;
  pool.query(queryText)
    .then(response => {
      res.send(response.rows);
    })
    .catch(err => {
      console.log('Error getting Users List:', err);
      res.sendStatus(500);
    })
});

router.put('/changeCaptainStatus', (req, res) => {
  let id = req.body.id;
  if (req.body.captain) {
    pool.query('UPDATE "user" SET "captain" = $1 WHERE "id" = $2;', [false, id])
      .then(response => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.log('Error Demoting user', err);
        res.sendStatus(500);
      })
  } else {
    pool.query('UPDATE "user" SET "captain" = $1 WHERE "id" = $2;', [true, id])
      .then(response => {
        console.log(response.rows);
        res.sendStatus(201);
      })
      .catch(err => {
        res.sendStatus(500);
        console.log('Error promoting user', err);
      })
  }
})

router.put('/changeActiveStatus', (req, res) => {
  let id = req.body.id;
  if (req.body.active) {
    pool.query('UPDATE "user" SET "active" = $1 WHERE "id" = $2;', [false, id])
      .then(response => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.log('Error Deactivating user', err);
        res.sendStatus(500);
      })
  } else {
    pool.query('UPDATE "user" SET "active" = $1 WHERE "id" = $2;', [true, id])
      .then(response => {
        console.log(response.rows);
        res.sendStatus(201);
      })
      .catch(err => {
        res.sendStatus(500);
        console.log('Error activating user', err);
      })
  }
})


router.post('/', (req, res) => {

});


//  GET ALL EVENTS for admin
// Join tables
router.get('/eventList', (req, res) => {
  let queryText = `SELECT "event"."id", 
                  "event"."title",
                  "event"."date",
                  "event"."attendee",
                  "event"."captain_id",
                  "user"."id",
                  "event_user"."event_id",
                  "event_user"."rating"
                  FROM "event"
                  LEFT OUTER JOIN "user" ON "user"."id" = "event"."captain_id"
                  LEFT OUTER JOIN "event_user" ON "event_user"."event_id" = "event"."id";`;

  pool.query(queryText)
    .then(response => {
      res.send(response.rows);
    })
    .catch(err => {
      console.log('Error getting admin events list:', err);
      res.sendStatus(500);
    })

})




module.exports = router;