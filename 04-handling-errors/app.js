var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');

var app = express();

const AppError = require('./utilities/AppError')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/products', productsRouter);

//mongo connection

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/farmStand");
  console.log("Connection open!");
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//Mongo validation error middleware
app.use((err, req, res, next) =>{
  console.log(err.name);
  if(err.name ==='ValidationError') err = handleValidationErr(err)
  //if(err.name ==='CastError') err = handleValidationErr(err) for example, another use.
  next(err)
})

const handleValidationErr = err => {
  console.log(err);
  return new AppError(`Validation Failed...${err.message}`, 400)
}

// error handler

app.use((err, req, res, next) => {
  const { status = 500, message = 'Something sent wrong' } = err;
  console.log(status);
  res.status(status).send(message)
})


// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send(err);
// });

module.exports = app;
