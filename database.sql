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
	"address" VARCHAR (300),
	"description" VARCHAR (2000),
	"feature" BOOLEAN DEFAULT false, 
	"carousel" BOOLEAN DEFAULT false,
	"image" VARCHAR (300),
	"captain_id" INT REFERENCES "user",
	"capacity" INT, 
	"attendee" INT
);

CREATE TABLE "event_user" (
	"id" SERIAL PRIMARY KEY,
	"event_id" INT REFERENCES "event",
	"user_id" INT REFERENCES "user",
	"feedback" BOOLEAN DEFAULT false,
	"comment" VARCHAR (2000),
	"rating" INT DEFAULT 0
);