CREATE TABLE "to-do" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(128),
	"complete" BOOLEAN DEFAULT FALSE,
	"timeComplete" VARCHAR(255)
	);
	
INSERT INTO "to-do" 
	("task", "complete", "timeComplete") 
VALUES 
	('Laundry', FALSE, null),
	('Homework', FALSE, null),
	('Mow Lawn', FALSE, null),
	('Grocery Shopping', FALSE, null),
	('Bury Bodies', FALSE, null),
	('Weed Garden', FALSE, null),
	('Take Out Garbage', FALSE, null);