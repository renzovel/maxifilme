var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var validator = require('validator');
const { Connection, DataTypes, privateKey, TokenExpire, Op} = require("./config");
const TblGeneros = require('../models/tblgenero');
const TblUsuarios = require('../models/tblusuario');
const Generos = TblGeneros(Connection, DataTypes);
const Usuarios = TblUsuarios(Connection, DataTypes);

async function ValidateToken(req, res, next){
    let meuToken = req.headers['access-token'];
    jwt.verify(meuToken, privateKey, async (erro, decode)=>{
        if(erro===null){
            try{
                req.usuarioExiste=await Usuarios.findOne({where:[{email:decode.email},{apagado:0}]});
                if(req.usuarioExiste!==null){
                    if(req.usuarioExiste.token!==meuToken){
                        try{
                            const apagar= await Usuarios.update({token:null},{where:[{email:email}]});
                            res.status(401).json({msg:"Usuario inválido, acesso negado.",data:{}}).end();
                        }catch(e){
                            res.status(401).json({msg:"Usuario inválido, acesso negado.",data:{}}).end();
                        }
                    }else{
                        next();
                    }
                }else{
                    res.status(401).json({msg:"Usuario inválido, acesso negado.",data:{}}).end();
                }
            }catch(e){
                res.status(401).json({msg:"Usuario inválido, acesso negado.",data:{}}).end();
            }
        }else{
            res.status(401).json({msg:"Token inválido, acesso negado.",data:{}}).end();
        }
    }) 
}


router.get("/all", ValidateToken, async (req, res)=>{
    const generos=await Generos.findAll({where:{apagado:0}});
    res.status(200).json({msg:"Gêneros registrados.",data:generos}); 
});



module.exports = router;