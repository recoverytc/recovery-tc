const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/myEvents', rejectUnauthenticated, (req, res) => {
    console.log('in myEvents req.query.id', req.query);
    let queryText = (`SELECT "title", "date", "time", "description", "address", "image", "capacity", "attendee" FROM "event" JOIN "event_user" ON "event_user"."event_id" = "event"."id" WHERE "event_user"."user_id" = $1;`);
    pool.query(queryText, [req.query.id]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;