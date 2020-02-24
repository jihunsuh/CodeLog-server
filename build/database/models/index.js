'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
console.log(__dirname);
const config = require('../config/config.json')[env];
const db = {};

const Companies = require('./companies');
const Users = require('./users');
const Postings = require('./postings');
const Types = require('./types');
const Subtitles = require('./subtitles');
const Contents = require('./contents');
const Tags = require('./tags');
const companies_tags = require('./companies_tags');
const postings_tags = require('./postings_tags');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

console.log('dirname', __dirname);

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     console.log('file file file', file);
//     return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
//   })
//   .forEach((file) => {
//     console.log('forEach file file', __dirname, file);
//     console.log('path', path);
//     console.log('path path dirname file', path.join(__dirname, file));
//     const model = sequelize['import'](path.join(__dirname, file));

//     console.log('name name name', model.name);
//     db[model.name] = model;
//   });

[Companies, Users, Postings, Types, Subtitles, Contents, Tags, companies_tags, postings_tags].map(
  (el) => {
    const model = sequelize.import(path.join(el.__dirname, el.__filename));
    db[model.name] = model;
  },
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
