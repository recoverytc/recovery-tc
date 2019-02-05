const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//delete from a users calendar
router.delete('/:event_id/:user_id', rejectUnauthenticated, (req, res) => {
    console.log('req.params', req.params.event_id, req.params.user_id);
    let queryText = (`DELETE FROM "event_user" WHERE "user_id" = $1 AND "event_id" = $2`);
    pool.query(queryText, [req.params.user_id, req.params.event_id]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.get('/myevents', rejectUnauthenticated, (req, res) => {
    console.log('in GET myEvents req.query.id', req.query);
    let queryText = (`SELECT "event"."id", "title", "venue", to_char ("date", 'Mon dd, YYYY') as "date", to_char ("time", 'HH12:MI AM') as "time", "description", "address", "image", "capacity", "attendee" FROM "event" JOIN "event_user" ON "event_user"."event_id" = "event"."id" WHERE "event_user"."user_id" = $1;`);
    pool.query(queryText, [req.query.id]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;