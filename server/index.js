const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const userRouter = require('./routes/user.router');
const loginRouter = require('./routes/login.router');

const app = express();
const Mongo_URI = `${config.dbInit}${config.dbHost}:${config.dbPort}/${config.dbName}`;

app.use(express.urlencoded({extended: true}));
app.use(express.json());


mongoose.connect(Mongo_URI,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false,}, (error, res) => {
  if(error) throw error;
  console.log('Database connected');
})

app.use('/user', userRouter);
app.use('/login', loginRouter);

app.listen(config.port, () => console.log(`Server running at http://localhost:${config.port}`));