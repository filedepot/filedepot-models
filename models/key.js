module.exports = (sequelize, DataTypes) => {
  var key = sequelize.define(
    "Key",
    {
      "keyId": {
        "type": DataTypes.CHAR(12),
        "primaryKey": true
      },
      "secretHash": {
        "type": DataTypes.CHAR(60),
        "allowNull": false
      },
      "origin": {
        "type": DataTypes.STRING(60),
        "allowNull": false
      }
    },
    {
      "classMethods": {
        associate: (models) => {
          models.Key.hasMany(models.Token, {
            "onDelete": "CASCADE",
            "foreignKey": {
              allowNull: false
            }
          });

          models.Key.belongsTo(models.Bucket);
        }
      },
      "instanceMethods": {
        "toJSON": function () {
          // ensure when keys gets dumped as JSON we do not output the secret
          let rep = this.get({ plain: true });
          Reflect.deleteProperty(rep.secret);
          return rep;
        }
      },
      "timestamps": false
    }
  );

  return key;
};
