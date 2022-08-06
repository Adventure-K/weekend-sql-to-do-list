const express = require('express');
const app = express();

const tasksRouter = require('./routes/task.router.js');
app.use('/tasks', tasksRouter);

app.use(express.urlencoded({extended: true}));
app.use(express.static('server/public'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
