const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

var db = false;

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASS || !process.env.DB_CONFIG) {
  module.exports = db;
} else {
  db = {};
  var sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    JSON.parse(process.env.DB_CONFIG)
  );

  const MODELS_PATH = path.join(__dirname, 'models');

  let handleReadDir = (dir) => {
    dir
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
  };

  fs
    .readdir(MODELS_PATH, handleReadDir);

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  module.exports = db;
}
