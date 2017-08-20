module.exports = (sequelize, DataTypes) => {
  const Key = sequelize.define(
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
        }
      },
      "instanceMethods": {

      },
      "timestamps": false
    }
  );

  Key.associate = (models) => {
    Key.hasMany(models.Token, {
      "onDelete": "CASCADE",
      "foreignKey": {
        allowNull: false
      }
    });

    Key.belongsTo(models.Bucket);
  };

  Key.prototype.toJSON = function() {
    // ensure when keys gets dumped as JSON we do not output the secret
    let rep = this.get({ plain: true });
    Reflect.deleteProperty(rep.secret);
    return rep;
  };

  return Key;
};
