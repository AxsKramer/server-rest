const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const config = require('./config');

const userRouter = require('./routes/user.router');
const loginRouter = require('./routes/login.router');
const categoryRouter = require('./routes/category.router');
const productRouter = require('./routes/product.router');
const uploadsRouter = require('./routes/uploads.router');
const imagenRouter = require('./routes/imagenes.router');

const app = express();
const Mongo_URI = `${config.dbInit}${config.dbHost}:${config.dbPort}/${config.dbName}`;

mongoose.connect(Mongo_URI,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false,}, (error, res) => {
  if(error) throw error;
  console.log('Database connected');
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.resolve(__dirname,'../public')));

app.use( fileUpload({ useTempFiles: true }) );

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/category', categoryRouter);
app.use('/products', productRouter);
app.use('/uploads', uploadsRouter);
app.use('/imagen', imagenRouter);

app.listen(config.port, () => console.log(`Server running at http://localhost:${config.port}`));