# Recovery St. Paul
This application uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

Recovery St. Paul is an event planning mobile first webapp for members of our local sober community with an emphasis on safety and communication.  It's a place where people in recovery can go to find out about sober events to encourage and support them in their personal journeys of recovery. The events are hosted by veteran members of the community known as Captains who are known personally by the Admin team.  Any member who attends an event is given the opportunity to leave non-published feedback after an event for the Admin team to see and quickly address any issues that may arise.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and tables

Create a new database called `recovery` and create these tables:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR (200) NOT NULL,
    "last_name" VARCHAR (200) NOT NULL,
    "email" VARCHAR (200) UNIQUE NOT NULL,
    "phone" VARCHAR (20) UNIQUE NOT NULL,
    "bio" VARCHAR (2000),
    "image" VARCHAR (2000),
    "admin" BOOLEAN DEFAULT false,
    "captain" BOOLEAN DEFAULT false,
    "active" BOOLEAN DEFAULT true,
    "password_reset" VARCHAR (250),
    "password_reset_expiration" BOOLEAN DEFAULT false,
    "password_verification" BOOLEAN DEFAULT false
);

CREATE TABLE "event" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (200),
	"date" DATE,
	"time" TIME,
	"venue" varchar (200),
	"address" VARCHAR (300),
	"description" VARCHAR (2000),
	"feature" BOOLEAN DEFAULT false, 
	"carousel" BOOLEAN DEFAULT false,
	"image" VARCHAR (300),
	"captain_id" INT REFERENCES "user",
	"capacity" INT, 
	"attendee" INT DEFAULT 1
);

CREATE TABLE "event_user" (
	"id" SERIAL PRIMARY KEY,
	"event_id" INT REFERENCES "event",
	"user_id" INT REFERENCES "user",
	"feedback" BOOLEAN DEFAULT false,
	"comment" VARCHAR (2000),
	"rating" INT DEFAULT NULL
	"attending" boolean default true
);
```

If you would like to name your database something else, you will need to change `recovery` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
```
SERVER_SESSION_SECRET=superDuperSecret
NUMVERIFY_API_KEY=010101010101010101010101

TWILIO_ACCOUNT_SID=010101010101010101010101
TWILIO_AUTH_TOKEN=010101010101010101010101
TWILIO_PHONE_NUMBER=+16125555555

S3_BUCKET=recoverytestaccount
AWS_ACCESS_KEY_ID=010101010101010101010101
AWS_SECRET_ACCESS_KEY=010101010101010101010101
```
    
SERVER_SESSION_SECRET
While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.

NUMVERIFY API KEY
You will need to replace '010101010101010101010101' with your own NumVerify key.  You can get a "trial account" at https://numverify.com/.  This is currently good for 250 API calls monthly, with paid subscriptions available starting at $9.99 monthly for 5000 API calls.

TWILIO
You will need to replace '010101010101010101010101' with your own Twilio SID and Auth Token as well as replacing '16125555555' with a Twilio phone number that can be purchased at https://www.twilio.com/.  A Twilio phone number that can be used for SMS is $1.00 monthly, with one SMS/second capability at $0.0075 per SMS.  They have faster plans available as well.

S3 BUCKET and AWS
You will need to replace 'recoverytestaccount' with your own Amazon Web Services bucket name.  This can be created at https://aws.amazon.com/.  You will navigate to the S3 console and create a bucket, making sure to set "block new public ACLs and uploading public objects" to FALSE.  You will also need to replace both instances of '010101010101010101010101' to your own AWS ACCESS KEY ID and SECRET ACCESS KEY that will be created on the same site.  This is all free up to 5GB, they do have paid plans with more information at https://aws.amazon.com/s3/pricing/.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Features
- Event creation, deletion, and editing
- Attendee count
- NumVerify integrated phone number verification
- Twilio integrated SMS reminders and cancellation notices
- Captain profile pages
- AWS integrated image uploading and storage

## Future Features
- Google Maps integration
- In app messaging 
- QR code integration for event sign in
- Registration with Facebook
- Event comments
- Recurring events

## Created With
- React.js
- React Redux
- Redux Sagas
- Node.js
- Express 
- Passport
- Material-UI
- Font Awesome
- PostgreSQL
- AWS S3
- Twilio
- NumVerify

## Created By
- Isaiah Buckhalton https://github.com/Buckhalton
- Morgan Costigan https://github.com/morgancostigan
- Said Omar https://github.com/saidomar23
- Amie Thao https://github.com/amitao


