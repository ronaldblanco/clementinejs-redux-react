import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import supertest from 'supertest';

// import config from './config';
let config = {
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017/fb-test',
  port: 3001,
  sessionSecret: 'foodbank-app'
};
global.expect = chai.expect;
global.sinon = sinon;
global.supertest = supertest;

chai.use(sinonChai);
chai.use(chaiAsPromised);

mongoose.Promise = global.Promise;

global.initDb = function* () {
  if (!mongoose.connection.readyState) {
    yield mongoose.connect(config.db);
    autoIncrement.initialize(mongoose.connection);
  }
};

global.resetDb = function* () {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  if (mongoose.connection.readyState) {
    yield mongoose.disconnect();
  }
};
