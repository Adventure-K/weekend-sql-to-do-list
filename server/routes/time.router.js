const express = require('express');
const timeRouter = express.Router();

const pool = require('../modules/pool');

timeRouter.put('/:id', (req, res) => { // Time complete request
    const id = req.params.id;
    const time = req.body.time;
    const values = [id, time]
    console.log('in task PUT (time complete)');
    const command = `UPDATE "to-do"
                    SET "timeComplete" = $2
                    WHERE "id" = $1`
    pool.query(command, values) // Request add completion timestamp to DB
        .then(result => {
            res.sendStatus(200);
        }).catch(err => {
            console.log('server PUT (time)', err);
        });
});

module.exports = timeRouter;