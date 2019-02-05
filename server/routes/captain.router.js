const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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