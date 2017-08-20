module.exports = (sequelize, DataTypes) => {
  const Bucket = sequelize.define(
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
      "timestamps": false
    }
  );

  Bucket.associate = (models) => {
    Bucket.hasMany(models.Key, {
      "onDelete": "CASCADE",
      "foreignKey": {
        allowNull: false
      }
    });
  };

  return Bucket;
};
