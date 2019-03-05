const pool = require('../modules/pool');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
cronJob = require('cron').CronJob;

const reminderJob = new cronJob('00 12 * * *', (req, res) => {
    console.log(' rj started')
    let queryText = `SELECT "event_user".*, "user"."first_name", 
      "user"."phone", "event"."title",
      to_char("event"."time", 'HH12:MI AM') as "time" FROM "event_user"
      JOIN "user" ON "event_user"."user_id" = "user"."id"
      JOIN "event" ON "event_user"."event_id" = "event"."id"
      WHERE "event"."date" = (current_date + 1);`;
    pool.query(queryText)

      .then((result) => {
        console.log('result.rows', result.rows);
        let rows = result.rows;

        for(let i = 0; i < rows.length; i++ ){
            client.messages.create({
                to: rows[i].phone,
                from: process.env.TWILIO_PHONE_NUMBER,
                body: `Hello! Hope you’re having a good day ${rows[i].first_name}! Remember, you have ${rows[i].title} coming up tomorrow at ${rows[i].time}. Get Stoked!`
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

const feedbackJob = new cronJob('00 12 * * *', (req, res) => {
    console.log(' fj started')
    let queryText = `SELECT "event_user".*, "user"."first_name", 
      "user"."phone", "event"."title",
      to_char("event"."time", 'HH12:MI AM') as "time" FROM "event_user"
      JOIN "user" ON "event_user"."user_id" = "user"."id"
      JOIN "event" ON "event_user"."event_id" = "event"."id"
      WHERE "event"."date" = (current_date - 1);`;
    pool.query(queryText)

        .then((result) => {
            console.log('result.rows', result.rows);
            let rows = result.rows;

            for (let i = 0; i < rows.length; i++) {
                client.messages.create({
                    to: rows[i].phone,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    body: `Hey ${rows[i].first_name}! Hope you had a good time at ${rows[i].title} yesterday.  We'd love if you would throw some feedback our way at http://10.100.100.150:3000/#/events/${rows[i].event_id} . Dank!`
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

  
module.exports = { reminderJob, feedbackJob };

