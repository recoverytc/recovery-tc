
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

//Twilio stuff
const {reminderJob, feedbackJob} = require('./modules/twilio-module');
// const feedbackJob = require('./modules/twilio-module');
// cronJob = require('cron').CronJob;
reminderJob.start();
feedbackJob.start();

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
