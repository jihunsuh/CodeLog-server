'use strict';
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const router = require('./routes');

// src/server.js
import serverless from 'serverless-http';
import express from 'express';

export default class Server {
  constructor() {
    this.app = express();
    this.app.use(
      session({
        secret: '@warrmansion',
        resave: false,
        saveUninitialized: true,
      }),
    );
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(morgan('dev'));
    this.app.use('/', router);
  }

  get handler() {
    // serverless-http 관련 설정
    return serverless(this.app);
  }
}
