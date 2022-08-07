const express = require('express');
const tasksRouter = express.Router();

const pool = require('../modules/pool');

tasksRouter.get('/', (req, res) => { // Request task list from DB
    console.log('in task GET')
    const command = 'SELECT * FROM "to-do" ORDER BY "id";';

    pool.query(command) // Retrieve current task list from DB
    .then(result => {
        console.log('get DB result', result.rows);
        res.send(result.rows); // Forward to client
    }).catch(err => {
        console.log('server GET error', err);
        res.sendStatus(500);
    })
})

tasksRouter.post('/', (req, res) => { // Add task request 
    console.log('in task POST');
    console.log('req.body: ', req.body);
    const newTask = req.body;
    const command = `INSERT INTO "to-do" ("task", "complete")
                    VALUES ($1, $2);`; 
    pool.query(command, [newTask.task, false]) // Request add new task to DB
        .then(result => {
        res.sendStatus(200);
    }).catch(err => {
        console.log('server POST error', err);
    });
});

tasksRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    console.log('id is', id);
    console.log('in task PUT');
    const command = `UPDATE "to-do"
                    SET "complete" = true
                    WHERE "id" = $1`
    pool.query(command, [id]) // Request mark task complete to DB
        .then(result => {
            res.sendStatus(200);
        }).catch(err => {
            console.log('server PUT error', err);
        });
});

tasksRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log('in task DELETE');
    const command = `DELETE FROM "to-do"
                    WHERE "id" = $1;`;
    pool.query(command, [id]) // Request delete task to DB
        .then(result => {
            res.sendStatus(200);
        }).catch(err => {
            console.log('server DELETE error', err);
        })
})

module.exports = tasksRouter;