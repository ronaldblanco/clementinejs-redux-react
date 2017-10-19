
import express from 'express';
import routes from './app/routes';
import mongoose from 'mongoose';
import passport from 'passport';
import passportGitHub from 'passport';
import passportLocal from 'passport';
import session from 'express-session';

import winston from 'winston';
require('winston-daily-rotate-file');
import compression from 'compression';
import functions from'./app/common/functions.server.js';

//const env = require('dotenv');
const env = process.env.NODE_ENV !== 'production' ? require('dotenv') : null;
if (env) env.load();

console.log(process.env.NODE_ENV);

import passportConfig from './app/config/passport';
passportConfig(passport);
import passportConfigGitHub from './app/config/passport-github';
passportConfigGitHub(passportGitHub);
import passportConfigLocal from './app/config/passport-local';
passportConfigLocal(passportLocal);

const app = express();

mongoose.connect(process.env.MONGODB_URI ||
  process.env.MONGO_URI || process.env.MONGOLAB_URI);

if (process.env.NODE_ENV === 'development') app.use('/', express.static(`${process.cwd()}/public`));
else if (process.env.NODE_ENV === 'production') app.use('/', express.static(`${process.cwd()}/dist/public`));
else app.use('/', express.static(`${process.cwd()}/public`));
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

const configHotReloading =
  process.env.NODE_ENV === 'development' && !process.env.DISABLE_WEBPACK
  ? require('./app/config/hotReload') : null;

if (configHotReloading) configHotReloading(app);

//////////////////////////////////////////////
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
//////////////////////////////////////////////

app.use(session({
  secret: process.env.SECRET_SESSION || 'secretClementine',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

//////////////////////////
if (process.env.NODE_ENV === 'development'){
    //Gulp build execution
    //functions.execute('gulp build');
    /////////////////////////////////////////////
    //CHECK FOLDER LOG AND CREATE IT////////////////////////////////////
    functions.ensureExists(__dirname + '/log', '0744', function(err) {
        if (err) console.error(err);
        else console.log('Folder Log was created or existed');
    });
    //////////////////////////////////////////////////

    //LOGGER//////////////////////////////////////////
    var logger = new (winston.Logger)({
        transports: [
        functions.transport
        ]
    });
    functions.logIt(logger,'//////////////////STARTING LOGGER INFO////////////////////////');
/////////////////////////////////////////////////
}
/////////////////////////

//Forzing Cache of static/////////////////////////
app.use(functions.cacheIt);
/////////////////////////////////////////////////

//COMPRESSION////////////////////////////////////
app.use(compression({filter: functions.shouldCompress}));
/////////////////////////////////////////////////

routes(app, passport, passportGitHub, emailServer, passportLocal);

const port = process.env.PORT || 8080;
app.listen(port, error => {
  /* eslint-disable no-console */
  if (error) console.log(error);
  console.log(`Node.js listening on port ${port}...`);
  /* eslint-enable no-console */
});
