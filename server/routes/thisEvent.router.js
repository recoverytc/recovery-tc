const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in GET This Event req.params.id', req.params.id);
    let queryText = (`SELECT "event".*, "user"."username", "user"."image" AS "captain_image" FROM "event" 
JOIN "user" ON "user"."id" = "event"."captain_id" WHERE "event"."id" = $1;`);
    pool.query(queryText, [req.params.id]).then((result) => {
        console.log('result.rows', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = router;