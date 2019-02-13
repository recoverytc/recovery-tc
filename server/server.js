
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const myEventsRouter = require('./routes/myEvents.router')
const eventListRouter = require('./routes/eventList.router');
const adminRouter = require('./routes/admin.router');
const thisEventRouter = require('./routes/thisEvent.router')
const captainRouter = require('./routes/captain.router')

// Twilio stuff
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken),
  cronJob = require('cron').CronJob;

const textJob = new cronJob('38 10 * * *', function () {
  // console.log('cron running');
  client.messages.create({
    to: process.env.MY_PHONE_NUMBER,
    from: process.env.TWILIO_PHONE_NUMBER,
    body: 'Hello! Hope you’re having a good day Morgan!'
  },
    function (err, data) { 
      console.log('error', err, 'data', data);
    });
}, null, true);



// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());
/* Routes */
app.use('/api/user', userRouter);
app.use('/api/myEvents', myEventsRouter);
app.use('/api/eventList', eventListRouter);
app.use('/api/admin', adminRouter);
app.use('/api/thisEvent', thisEventRouter)
app.use('/api/captain' , captainRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
