const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET captain profile and events that was created
router.get('/profile/:id', (req, res) => {
    console.log(req.params.id);
    
    let id = req.params.id;
    let queryString = `SELECT
                            "user"."first_name", 
                            "user"."last_name", 
                            "user"."email", 
                            "user"."bio", 
                            "user"."image",
                            "event"."captain_id",
                            "event"."title",
                            "event"."date",
                            "event"."time",
                            "event"."description",
                            "event"."address",
                            "event"."image"
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

module.exports = router