'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tblusuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tblusuario.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN,
    datan: DataTypes.DATE,
    foto: DataTypes.STRING,
    nivel: DataTypes.INTEGER,
    token: DataTypes.STRING,
    apagado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tblusuario',
  });
  return tblusuario;
};