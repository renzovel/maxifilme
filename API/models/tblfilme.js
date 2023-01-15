'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tblfilme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tblfilme.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    genero: DataTypes.STRING,
    autor: DataTypes.STRING,
    image: DataTypes.STRING,
    apagado: DataTypes.BOOLEAN,
    tblusuarioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tblfilme',
  });
  return tblfilme;
};