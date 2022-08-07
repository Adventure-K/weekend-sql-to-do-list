const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const tasksRouter = require('./routes/task.router.js');
app.use('/tasks', tasksRouter);

const timeRouter = require('./routes/time.router.js');
app.use('/time', timeRouter);

// app.use(express.urlencoded({extended: true})); // Did not work for some reason.
app.use(express.static('server/public'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
