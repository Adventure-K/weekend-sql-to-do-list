CREATE TABLE "to-do" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(128),
	"complete" BOOLEAN DEFAULT FALSE
	);
	
INSERT INTO "to-do" 
	("task", "complete") 
VALUES 
	('Laundry', FALSE),
	('Homework', FALSE),
	('Mow Lawn', FALSE),
	('Grocery Shopping', FALSE),
	('Bury Bodies', FALSE),
	('Weed Garden', FALSE),
	('Take Out Garbage', FALSE);