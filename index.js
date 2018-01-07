const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

var db = false;

db = {};
var sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  JSON.parse(process.env.DB_CONFIG)
);

const MODELS_PATH = path.join(__dirname, 'models');

// eslint-disable-next-line no-sync
fs
  .readdirSync(MODELS_PATH)
  .filter((file) => {
    // skip all filenames that start with a '.'
    return file.indexOf(".") !== 0;
  })
  .forEach((file) => {
    var model = sequelize.import(path.join(MODELS_PATH, file));
    db[model.name] = model;
  });

Object
  .keys(db)
  .forEach((modelName) => {
    if ("associate" in db[modelName]) {
      db[modelName].associate(db);
    }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
