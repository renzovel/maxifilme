var path = require("path");
const {Sequelize, DataTypes, Op} = require("sequelize");
module.exports={
    Connection:new Sequelize({
        dialect: 'sqlite',
        storage: path.resolve(`${__dirname}/../database/dbmaxifilme.db`)
    }),
    DataTypes:DataTypes,
    privateKey:"55j6h5j4j55h3jhk4jh54kj5h4j5k455j4h5j4h54jh5",
    TokenExpire:'1h',
    Op:Op
}