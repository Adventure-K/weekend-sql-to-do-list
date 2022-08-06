const express = require('express');
const tasksRouter = express.Router();

const pool = require('../modules/pool');

tasksRouter.get('/', (req, res) => {
    console.log('in task GET')
    const command = 'SELECT * FROM "to-do" ORDER BY "id";';

    pool.query(command)
    .then(result => {
        console.log('get DB result', result.rows);
        res.send(result.rows);
    }).catch(err => {
        console.log('server GET error', err);
        res.sendStatus(500);
    })
        
})

tasksRouter.post('/', (req, res) => {
    console.log('in task POST');
    console.log('req.body: ', req.body);
    const newTask = req.body;
    const command = `INSERT INTO "to-do" ("task", "complete")
                    VALUES ($1, $2);`;
    pool.query(command, [newTask.task, false])
        .then(result => {
        res.sendStatus(200);
    }).catch(err => {
        console.log('error in POST', err);
    });
});

tasksRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    console.log('id is', id);
    console.log('in task PUT');
    const command = `UPDATE "to-do"
                    SET "complete" = true
                    WHERE "id" = $1`
    pool.query(command, [id])
        .then(result => {
            res.sendStatus(200);
        }).catch(err => {
            console.log('error in PUT', err);
        });
});

module.exports = tasksRouter;