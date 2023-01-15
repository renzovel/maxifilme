var path = require("path");
const {Sequelize, DataTypes} = require("sequelize");
module.exports={
    Connection:new Sequelize({
        dialect: 'sqlite',
        storage: path.resolve(`${__dirname}/../database/dbmaxifilme.db`)
    }),
    DataTypes:DataTypes
}