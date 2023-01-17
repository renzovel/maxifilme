'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tblgenerosfilme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tblgenerosfilme.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    apagado: DataTypes.INTEGER,
    tblgeneroId: DataTypes.INTEGER,
    tblfilmeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tblgenerosfilme',
  });
  return tblgenerosfilme;
};