const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated, rejectNonCaptain, rejectNonAdmin } = require('../modules/authentication-middleware');

//add to a user's calendar and add 1 to attendee count on the event
router.post('/addevent', rejectUnauthenticated, (req, res) => {
    let queryText = (`WITH eventAttend AS(
        INSERT INTO "event_user"("event_id", "user_id") 
        VALUES($1, $2)
        RETURNING "event_id")
        UPDATE "event" SET "attendee" = "attendee" + 1 
        WHERE "id" = (SELECT "event_id" FROM eventAttend);`);
    pool.query(queryText, [req.body.event_id, req.body.user_id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

//delete from a users calendar
router.delete('/:event_id/:user_id', rejectUnauthenticated, (req, res) => {
    let queryText = (`WITH noLongerAttend AS (
        DELETE FROM "event_user" WHERE "event_id" = $1 AND "user_id" = $2 
        RETURNING "event_id")
        UPDATE "event" SET "attendee" = "attendee" - 1 
        WHERE "id" = (SELECT "event_id" FROM noLongerAttend);`);
    pool.query(queryText, [req.params.event_id, req.params.user_id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

// Gets all events that a user has selected to attend
router.get('/myevents', rejectUnauthenticated, (req, res) => {
    let queryText = (`SELECT "event"."id", "title", "venue", 
        to_char ("date", 'Mon dd, YYYY') as "date", 
        to_char ("time", 'HH12:MI AM') as "time", 
        "description", "address", "image", "capacity", "attendee" 
        FROM "event" 
        JOIN "event_user" ON "event_user"."event_id" = "event"."id" 
        WHERE "event_user"."user_id" = $1 
        AND "date" >= (now() - INTERVAL '7 day')
        ORDER BY "date" ASC;`);
    pool.query(queryText, [req.query.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

// Allows users to post feedback
router.put('/feedback', rejectUnauthenticated, (req, res) => {
    let queryText = `UPDATE "event_user" SET "feedback"=$1, "comment"=$2, "rating"=$3  WHERE "event_id"=$4 AND "user_id"=$5;`;
    let queryValues = [req.body.feedback,
    req.body.comment,
    req.body.rating,
    req.body.id, req.user.id]
    pool.query(queryText, queryValues)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.sendStatus(500);
        })
})

module.exports = router;