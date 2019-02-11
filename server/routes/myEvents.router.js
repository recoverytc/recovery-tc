const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated , rejectNonCaptain , rejectNonAdmin } = require('../modules/authentication-middleware');

//add to a user's calendar and add 1 to attendee count on the event
router.post('/addevent', rejectUnauthenticated, (req, res) => {
    console.log('req.body', req.body);
    let queryText = (`WITH eventAttend AS(
        INSERT INTO "event_user"("event_id", "user_id") 
        VALUES($1, $2)
        RETURNING "event_id")
        UPDATE "event" SET "attendee" = "attendee" + 1 
        WHERE "id" = (SELECT "event_id" FROM eventAttend);`);
    pool.query(queryText, [req.body.event_id, req.body.user_id]).then((result) => {
    // pool.query(queryText).then((result) => {

        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

//delete from a users calendar
router.delete('/:event_id/:user_id', rejectUnauthenticated, (req, res) => {
    console.log('req.params', req.params.event_id, req.params.user_id);
    let queryText = (`WITH noLongerAttend AS (
        DELETE FROM "event_user" WHERE "event_id" = $1 AND "user_id" = $2 
        RETURNING "event_id")
        UPDATE "event" SET "attendee" = "attendee" - 1 
        WHERE "id" = (SELECT "event_id" FROM noLongerAttend);`);
    pool.query(queryText, [req.params.event_id, req.params.user_id]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.get('/myevents', rejectUnauthenticated, (req, res) => {
    console.log('in GET myEvents req.query.id', req.query);
    let queryText = (`SELECT "event"."id", "title", "venue", 
        to_char ("date", 'Mon dd, YYYY') as "date", 
        to_char ("time", 'HH12:MI AM') as "time", 
        "description", "address", "image", "capacity", "attendee" 
        FROM "event" 
        JOIN "event_user" ON "event_user"."event_id" = "event"."id" 
        WHERE "event_user"."user_id" = $1;`);
    pool.query(queryText, [req.query.id]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;