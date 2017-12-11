
import express from 'express';
import routes from './app/routes';
import mongoose from 'mongoose';
import passport from 'passport';
import passportGitHub from 'passport';
import passportLocal from 'passport';
import session from 'express-session';
import cookieSession from'cookie-session';
import helmet from 'helmet';

import winston from 'winston';
require('winston-daily-rotate-file');
import compression from 'compression';
import functions from'./app/common/functions.server.js';
import forceSsl from'./app/common/force-ssl.js';
import { logErrors, clientErrorHandler, errorHandler  } from'./app/common/errors.js';

// For Socket////////////////
import webSocketHandler from './app/controllers/webSocketHandler.server.js';
import config from './app/models/socketData.js';
// ////////////////////

// const env = require('dotenv');
const env = process.env.NODE_ENV !== 'production' ? require('dotenv') : null;
if (env) env.load();

console.log(process.env.NODE_ENV);

import passportConfig from './app/config/passport';
if(process.env.TWITTER_CONSUMER_KEY){
  passportConfig(passport);
}
import passportConfigGitHub from './app/config/passport-github';
if(process.env.GITHUB_KEY){
  passportConfigGitHub(passportGitHub);
}
import passportConfigLocal from './app/config/passport-local';
passportConfigLocal(passportLocal);

const app = express();

mongoose.connect(process.env.MONGODB_URI ||
  process.env.MONGO_URI || process.env.MONGOLAB_URI);

/* if (process.env.NODE_ENV === 'development') app.use('/', express.static(`${process.cwd()}/public`));
else if (process.env.NODE_ENV === 'production') app.use('/', express.static(`${process.cwd()}/dist/public`));
else */
// Files///////////////
app.use('/', express.static(`${process.cwd()}/dist/public`));
// Client controllers
app.use('/controllers', express.static(process.cwd() + '/client/src/controllers'));
// Socket///////////////
app.use('/socket', express.static(process.cwd() + '/node_modules/socket.io-client/dist'));
/////EMAIL CONFIG////////////////////////////////////////////////////////////////////////////
app.use('/emailjs', express.static(process.cwd() + '/node_modules/emailjs'));
////////////////////////////////////////////////////////////////////////////////////
/////EMAIL CONFIG////////////////////////////////////////////////////////////////////////////
var emailServer = {
    'user' : process.env.EMAILUSER,
    'password' : process.env.EMAILPASS,
    'host' : process.env.EMAILHOST,
    'port' : process.env.EMAILPORT
};
////////////////////////////////////////////////////////////////////////////////////

/* if (process.env.NODE_ENV === 'development') {
  // functions.execute('make webpack_min');
  
  const configHotReloading =
  process.env.NODE_ENV === 'development' && !process.env.DISABLE_WEBPACK
    ? require('./app/config/hotReload') : null;
  if (configHotReloading) configHotReloading(app);
} */

// ////////////////////////
if (process.env.NODE_ENV === 'development'){
    // HotReload build execution
    functions.execute('make webpack_min');
    // ///////////////////////////////////////////
    app.use(session({
      secret: process.env.SECRET_SESSION || 'secretClementine',
      resave: false,
      saveUninitialized: true,
    }));
    // CHECK FOLDER LOG AND CREATE IT////////////////////////////////////
    functions.ensureExists(__dirname + '/log', '0744', function(err) {
        if (err) console.error(err);
        else console.log('Folder Log was created or existed');
    });
    // ////////////////////////////////////////////////
    // LOGGER//////////////////////////////////////////
    var logger = new (winston.Logger)({
        transports: [
        functions.transport
        ]
    });
    functions.logIt(logger,'//////////////////STARTING LOGGER INFO////////////////////////');
// ///////////////////////////////////////////////
}
if (process.env.NODE_ENV === 'production'){
  app.set('trust proxy', 1); // trust first proxy
  app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }));
  // Forzing Cache of static/////////////////////////
  app.use(functions.cacheIt);
  // ///////////////////////////////////////////////
  // COMPRESSION////////////////////////////////////
  app.use(compression({filter: functions.shouldCompress}));
  // ///////////////////////////////////////////////
  if(process.env.SSLFORCE === 'TRUE' && process.env.SSLFORCE !== undefined) app.use(forceSsl);// Forcing SSL
  app.use(helmet());// Good and security practices for production!
}
// ///////////////////////

//////////////////////////////////////////////
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
//////////////////////////////////////////////

app.use(passport.initialize());
app.use(passport.session());

// Error-handling middleware
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
// //////////////////////////

let appEnv = {
  env: process.env.NODE_ENV,
  admin: process.env.ADMIN,
  twitter: process.env.TWITTER_CONSUMER_KEY,
  github: process.env.GITHUB_KEY,
  socket: process.env.SOCKET
};

routes(app, passport, passportGitHub, emailServer, passportLocal, appEnv);

const port = process.env.PORT || 8080;

if (process.env.SOCKET === 'TRUE' && process.env.SOCKET !== undefined){
    //Uncomment to used the Websocket Controller
    //using: socket.io http and model config.js as test
    //WEBSOCKET///////////////////////////
    var server = require('http').createServer(app);
    var io = require('socket.io')(server);
    //Changes in case of production
    var endpoint = io
        .of('/')
        .on('connection', function (socket) {
            webSocketHandler.respond(endpoint, socket, true, config, 0);
    });

    server.listen(port,  function () {
	    console.log('Node.js with WebSocket listening on port ' + port + '...');
    });
    //WEBSOCKET//////////////////////////
    
} else if (process.env.SOCKET === 'FALSE' || process.env.SOCKET === undefined || process.env.SOCKET === null){
  app.listen(port, error => {
    /* eslint-disable no-console */
    if (error) console.log(error);
    console.log(`Node.js listening on port ${port}...`);
    /* eslint-enable no-console */
  });
}


