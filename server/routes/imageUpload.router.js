const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

// Define POST route
router.post('/', (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `imageFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      const dated = fields.date[0];
      const time = fields.time[0];
      const address = fields.address[0];
      const description = fields.description[0];
      const capacity = fields.capacity[0];
      const venue = fields.venue[0];
      const title = fields.title[0];
      let queryValues = [title, dated, time, address, description, data.Location, request.user.id, parseInt(capacity), venue, request.user.id];
      let queryString = `WITH addEvent AS(
                INSERT INTO "event" ("title" , "date", "time", "address", "description", 
                "image", "captain_id", "capacity", "venue")
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING "event"."id")
                INSERT INTO "event_user" ("event_id", "user_id") 
                VALUES((SELECT "id" FROM addEvent), $10);`;
      await pool.query(queryString, queryValues);
      response.sendStatus(200);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
});

// Allows Captains to edit event data
router.put('/edit', (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      let data;
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `imageFolder/${timestamp}-lg`;
      data = await uploadFile(buffer, fileName, type);
      let queryValues = [title, dated, time, address, description, imageData, parseInt(capacity), venue, eventid];
      let queryString = `UPDATE "event" SET "title"=$1 , "date"=$2, "time"=$3, "address"=$4, "description"=$5, "image"=$6, "capacity"=$7, "venue"=$8 WHERE "id"=$9`;
      await pool.query(queryString, queryValues);
      response.sendStatus(200);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
});

//Allows captains to edit their account image
router.put('/edit/account', (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `imageFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      let queryValues = [data.Location, request.user.id];
      let queryString = `UPDATE "user" SET "image"=$1 WHERE "id"=$2;`;
      await pool.query(queryString, queryValues);
      response.sendStatus(200);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
});


module.exports = router;