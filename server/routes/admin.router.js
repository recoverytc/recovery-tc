const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/getUsers', (req, res) => {
    let queryText = `SELECT "first_name", "last_name", "username", "email", "phone", "captain", "active", "id" FROM "user" ORDER BY "id" ASC;`;
    pool.query(queryText)
    .then( response => {
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


router.get('/attendees/:id', (req, res) => {
    let id = req.params.id;
    let queryText = `SELECT "event_user"."id",
                            "event_user"."event_id", 
                            "event"."title", 
                            "event_user"."user_id",
                            "event_user"."comment",
                            "event_user"."rating", 
                            "user"."username"
                            FROM "event_user"
                            JOIN "user" ON "event_user"."user_id" = "user"."id"
                            JOIN "event" ON "event_user"."event_id" = "event"."id" WHERE "event"."id" = $1 ORDER BY "id" ASC;`;
    pool.query(queryText, [id])
    .then(response => {
        res.send(response.rows);
    })
    .catch(err => {
        console.log('Error in attendees GET:', err);
        res.sendStatus(500);
    })
})


router.post('/', (req, res) => {

});


//  GET ALL EVENTS for admin
// Join tables
router.get('/eventList', (req, res) => {
  let queryText = `SELECT "event".*, "user"."first_name", 
    "user"."last_name", avg("event_user"."rating") 
    FROM "event" 
    JOIN "event_user" ON "event_user"."event_id" = "event"."id" 
    JOIN "user" ON "event"."captain_id" = "user"."id"
    GROUP BY "event"."id", "user"."first_name", "user"."last_name"
    ORDER BY "date" DESC;`;
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