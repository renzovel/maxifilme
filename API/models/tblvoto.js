'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tblvoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tblvoto.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    puntuacao: DataTypes.INTEGER,
    comentario: DataTypes.TEXT,
    apagado: DataTypes.INTEGER,
    tblusuarioId: DataTypes.INTEGER,
    tblfilmeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tblvoto',
  });
  return tblvoto;
};