import express, { Application, NextFunction, Request, Response } from "express";
import createError, { HttpError } from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from "mongoose";
import mongodb from './config/mongodb';

const app: Application = express();
const port = process.env.PORT || 3000;

// Connect to mongodb
mongodb.connect();

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", require('./routes/index'));
app.use("/words", require('./routes/words'));
app.use("/dictionary", require('./routes/dictionary'));

// catch 404 and forward to error handler
app.use(function (req: any, res: any, next: any) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

try {
  mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
  });
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
