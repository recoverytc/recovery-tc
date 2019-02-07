const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET captain profile and events that was created
router.get('/profile/:id', (req, res) => {
    console.log(req.params.id);
    
    let id = req.params.id;
    let queryString = `SELECT "user"."username",
                            "user"."first_name", 
                            "user"."last_name", 
                            "user"."email",
                            "user"."phone", 
                            "user"."bio", 
                            "user"."image",
                            "event"."captain_id",
                            "event"."title",
                            "event"."date",
                            "event"."time",
                            "event"."venue",
                            "event"."description",
                            "event"."address",
                            "event"."image" AS "event_image",
                            "event"."id" AS "event_id"
                            FROM "user" 
                            JOIN "event" ON "event"."captain_id" = "user"."id"
                            WHERE "user"."id" = $1 ;`;
                            
    pool.query(queryString, [id])
    .then( result => {
        res.send(result.rows);
    })
    .catch( err => {
        console.log('Error in getting captain profile', err);
        res.sendStatus(500);
    })
})

router.post('/addevent' , (req, res)=>{
    let queryString = `INSERT INTO "event" ("title" , "date", "time", "address", "description", "image", "captain_id", "capacity", "venue")
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
    pool.query(queryString , [req.body.title , req.body.date, req.body.time, req.body.address, req.body.description, req.body.image, req.user.id, req.body.capacity, req.body.venue ])
    .then(result =>{
        res.sendStatus(200)
    }).catch(error =>{
        console.log('error in add event server' , error);
        res.sendStatus(500)
    })
})

router.put('/profile/edit/:id', (req,res) =>{

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

router.put('/edit/event' , (req , res) =>{
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