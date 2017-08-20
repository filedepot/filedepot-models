module.exports = (sequelize, DataTypes) => {
  var bucket = sequelize.define(
    "Bucket",
    {
      "bucketId": {
        "type": DataTypes.CHAR(8),
        "primaryKey": true
      },
      "path": {
        "type": DataTypes.STRING(1024),
        "allowNull": false
      }
    },
    {
      "classMethods": {
        associate: (models) => {
          models.Bucket.hasMany(models.Key, {
            "onDelete": "CASCADE",
            "foreignKey": {
              allowNull: false
            }
          });
        }
      },
      "timestamps": false
    }
  );

  return bucket;
};
