import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

import initUserModel from './user.mjs';
import initTripModel from './trip.mjs';
import initDayModel from './day.mjs';
import initCountryModel from './country.mjs'

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Day = initDayModel(sequelize, Sequelize.DataTypes);
db.Trip = initTripModel(sequelize, Sequelize.DataTypes);
db.Country = initCountryModel(sequelize, Sequelize.DataTypes)

// many to many table
db.Country.belongsToMany(db.Trip, { through: 'trip_countries', onDelete: 'cascade', hooks:true});
db.Trip.belongsToMany(db.Country, { through: 'trip_countries', onDelete: 'cascade', hooks:true});

// one to many table
db.Trip.belongsTo(db.User);
db.User.hasMany(db.Trip);

db.Day.belongsTo(db.Trip)
db.Trip.hasMany(db.Day)

// one to one table
db.Day.belongsTo(db.Country)
db.Country.hasOne(db.Day)
export default db;
