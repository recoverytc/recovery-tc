const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated , rejectNonCaptain , rejectNonAdmin } = require('../modules/authentication-middleware');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// GET captain profile 
router.get('/profile/:id',rejectNonCaptain , (req, res) => {
    // console.log(req.params.id);
    
    let id = req.params.id;
    let queryString = `SELECT 
                            "user"."username",
                            "user"."first_name", 
                            "user"."last_name", 
                            "user"."email",
                            "user"."phone", 
                            "user"."bio", 
                            "user"."image"
                            FROM "user" 
                            WHERE "id" = $1;`;
                            
    pool.query(queryString, [id])
    .then( result => {
        res.send(result.rows);
    })
    .catch( err => {
        console.log('Error in getting captain profile', err);
        res.sendStatus(500);
    })
})

// ADD NEW EVENT
//from eventFormSaga
router.post('/addevent' , (req, res)=>{
    let queryString = `WITH addEvent AS(
        INSERT INTO "event" ("title" , "date", "time", "address", "description", 
        "image", "captain_id", "capacity", "venue")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING "event"."id")
        INSERT INTO "event_user" ("event_id", "user_id") 
        VALUES((SELECT "id" FROM addEvent), $10);`
    pool.query(queryString , [req.body.title , 
        req.body.date, 
        req.body.time, 
        req.body.address, 
        req.body.description, 
        req.body.image, 
        req.user.id, 
        req.body.capacity, 
        req.body.venue,
        req.user.id, 
 ])

    .then(result =>{
        res.sendStatus(200)
    }).catch(error =>{
        console.log('error in add event server' , error);
        res.sendStatus(500)
    })
})

//SEND TEXT NOTIFICATION OF CANCELLED EVENT
//from eventFormSaga
router.get('/cancel/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.params', req.params.id);
    let queryText = (`SELECT "event_user".*, "user"."first_name", "user"."phone", 
        "event"."title", to_char ("event"."time", 'HH12:MI AM') as "time", 
        to_char ("event"."date", 'Mon dd, YYYY') as "date" FROM "event_user"
        JOIN "user" ON "event_user"."user_id" = "user"."id"
        JOIN "event" ON "event_user"."event_id" = "event"."id"
        WHERE "event"."id" = $1;`);
    pool.query(queryText, [req.params.id])
      .then((result) => {
          res.sendStatus(200);
          console.log('result.rows', result.rows);
          let rows = result.rows;

          for (let i = 0; i < rows.length; i++) {
              client.messages.create({
                  to: rows[i].phone,
                  from: process.env.TWILIO_PHONE_NUMBER,
                  body: `Hi, ${rows[i].first_name}. Just letting you know that ${rows[i].title} coming up ${rows[i].date} at ${rows[i].time} has been cancelled. Thanks for reading.`

                },

                  function (err, data) {
                      console.log('error', err, 'data', data);
                  });
          }

      })

            .catch((error) => {
                console.log(`Error making query twilio reminders`, error);
                // res.sendStatus(500);
            }, null, true)
});

//DELETE A CANCELLED EVENT
//from eventFormSaga
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.params', req.params.id);
    let queryText = (`WITH "eventCancel" AS (
        DELETE FROM "event_user" WHERE "event_id" = $1
        RETURNING "event_id" as "id")
        DELETE FROM "event" WHERE "id" = $1;`);
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.put('/profile/edit/:id',rejectNonCaptain , (req,res) =>{

    let queryString = `UPDATE "user" SET "first_name"=$1, "last_name"=$2, "email"=$3, "phone"=$4, "image"=$5,
                        "bio"=$6 WHERE "id"=$7;`;

    const queryValues = [req.body.first_name, req.body.last_name, req.body.email, req.body.phone, req.body.image, req.body.bio, req.params.id]
    pool.query(queryString, queryValues)
    .then ( () => {
        res.sendStatus(200);
    })
    .catch ( err => {
        console.log('Error in updating captain profile', err);
        res.sendStatus(500);
    })
})

router.put('/edit/event' , rejectNonCaptain ,(req , res) =>{
    let queryString = `UPDATE "event" SET "title"=$1 , "date"=$2, "time"=$3, "address"=$4, "description"=$5, "image"=$6, "capacity"=$7, "venue"=$8 WHERE "id"=$9`
    pool.query(queryString, [req.body.title, req.body.date, req.body.time, req.body.address, req.body.description, req.body.image, req.body.capacity, req.body.venue, req.body.id])
    .then(results =>{
        res.sendStatus(200)
    }).catch(error =>{
        console.log('error in put edit event' , error);
        res.sendStatus(500)
    })
})




module.exports = router