const https = require('https');
const fs = require('fs');
var cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose();

database = new sqlite3.Database("./database.db");
const config = require("./app/Models/config.models");

var userRouter = require('./app/Routes/user.routes');
var configRouter = require('./app/Routes/config.routes');

var dataUtils = require('./app/Utils/data.utils');
var consoleUtils = require('./app/Utils/console.utils');

applicationService = require('./app/Services/application.services');

//replace yourdomain.com with your back-end hosting domain
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca
// };

app = express();
app.use(cors());

const port = 3000;

//global config variables
APPLICATION_NAME = "My application";
JWT_SECRET = null;
SMTP_HOST = null;
SMTP_PORT = null;
SMTP_USERNAME = null;
SMTP_PASSWORD = null;

//setup routes for Express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/config', configRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    message: "Route does not exist."
  })
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err
  })
});

// const server = https.createServer(credentials, app);

// timeout to allow database creation in case of first start up
setTimeout(function () {
  // check if config table is present, if not perform initial setup
  config.getConfig((err, data) => {
    if (data == undefined) {
      console.log(consoleUtils.yellowConsoleLog("Initial setup detected! Tips:"));
      console.log("1. The first account to be registered automatically gets the administrator role / access to settings.");
      JWT_SECRET = dataUtils.generateRandomHash();

      config.setupConfigRow([JWT_SECRET]);
    } else {
      JWT_SECRET = data.jwtSecret;

      SMTP_HOST = data.smtpHost;
      SMTP_PORT = data.smtpPort;
      SMTP_USERNAME = data.smtpUsername;
      SMTP_PASSWORD = data.smtpPassword;
    }
  });

  app.listen(port, () => {
    console.log(consoleUtils.greenText(`Listening on port ${port}`));

    applicationService.start();
  });
}, 500);

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Preventing crash..");
});