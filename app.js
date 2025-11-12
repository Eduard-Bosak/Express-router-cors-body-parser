var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Подключение middleware для CORS и body-parser
const cors = require("cors");
const bodyParser = require("body-parser");

// Подключение роутеров
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const itemsRouter = require("./routes/items");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware для логирования, парсинга и CORS
app.use(logger('dev'));
app.use(cors()); // Разрешаем запросы из других доменов
app.use(bodyParser.json()); // Парсинг JSON в теле запроса
app.use(bodyParser.urlencoded({ extended: true })); // Парсинг URL-encoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Подключение маршрутов
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api/items", itemsRouter); // CRUD API для элементов

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
