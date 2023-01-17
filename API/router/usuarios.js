var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var validator = require('validator');
const TblUsuarios = require('../models/tblusuario');
const { Connection, DataTypes, privateKey, TokenExpire} = require("./config");
const Usuarios = TblUsuarios(Connection, DataTypes);
const salt = bcrypt.genSaltSync(10);


const isAdmin=(req,res,next)=>{
    req.usuarioExiste.nivel === 1?next():res.status(401).json({msg:"Usuario inválido, acesso negado.",data:{}}).end();
}

async function ValidateToken(req, res, next){
    let meuToken = req.headers['access-token'];
    jwt.verify(meuToken, privateKey, async (erro, decode)=>{
        if(erro===null){
            try{
                req.usuarioExiste=await Usuarios.findOne({where:[{email:decode.email},{apagado:0}]});
                if(req.usuarioExiste!==null){
                    next();
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


async function validarCadastro(req, res, next){
    const items={}, {nome, email, senha} = req.body;
    if(!validator.isEmail(email)){
        items.email=email;
    }
    if(!validator.isAlpha(nome)||!validator.isLength(nome,{min:4,max:40})){
        items.nome=nome;
    }
    if(!validator.isLength(senha,{min:8,max:20})||validator.isEmpty(senha, {ignore_whitespace:false})){
        items.senha=senha;
    }
    if(Object.keys(items).length>0){
        res.status(200).json({msg:"Dados inválidos.",data:items});
    }else{
        next();
    }
}

async function validarLogin(req, res, next){
    const items={}, {email, senha} = req.body;
    if(!validator.isEmail(email)){
        items.email=email;
    }
    if(!validator.isLength(senha,{min:8,max:20})||validator.isEmpty(senha, {ignore_whitespace:false})){
        items.senha=senha;
    }
    if(Object.keys(items).length>0){
        res.status(200).json({msg:"Dados inválidos.",data:items});
    }else{
        next();
    }
}

async function validarEmail(req, res, next){
    const items={}, {email} = req.body;
    if(!validator.isEmail(email)){
        items.email=email;
    }
    if(Object.keys(items).length>0){
        res.status(200).json({msg:"Dados inválidos.",data:items});
    }else{
        next();
    }
}

async function usuarioExiste(req, res, next){
    const {email} = req.body;
    req.usuarioExiste=await Usuarios.findOne({where:{email:email, apagado:0}});
    next();
}
 
//cadastrar 
router.post('/cadastrar', ValidateToken, isAdmin, validarCadastro, usuarioExiste, async  (req, res) => {
    const {nome, email, senha} = req.body;
    if(req.usuarioExiste==null){
        var token = jwt.sign({ email: email}, privateKey, { expiresIn: TokenExpire });
        const CreateUsuarios=await Usuarios.create({
            nome: nome,
            email: email,
            senha: bcrypt.hashSync(senha,salt),
            createdAt: new Date(),
            updatedAt: new Date()
        });
        res.status(200).json({msg:"ok",data:{token:token}});
    }else{
        res.status(200).json({msg:"Usuário já cadastrado no sistema.",data:false});
    }
})

//login 
router.post('/login', validarLogin, usuarioExiste, async (req, res) => {
    if(req.usuarioExiste!==null){
        if(bcrypt.compareSync(req.body.senha, req.usuarioExiste.senha)){
            var token = jwt.sign({ email: req.usuarioExiste.email}, privateKey, { expiresIn: TokenExpire });
            const resposta = await req.usuarioExiste.update({token:token});
            res.status(200).json({msg:"ok",data:{token:token}});
        }else{
            res.status(200).json({msg:"Senha incorreta.",data:false});
        }
    }else{
        res.status(200).json({msg:"Usuario não cadastrado no sistema.",data:false});
    }
})

//mostrar todos 
router.get('/all', ValidateToken, isAdmin, async (req, res) => { 
    const AllUsuarios=await Usuarios.findAll({where : {apagado:0}});
    res.status(200).json({ action: 'Listar Usuarios', data : AllUsuarios});
})

//apagar um cadastro
router.delete('/apagar', ValidateToken, isAdmin, validarEmail, async (req, res) => {
    try{
        const {email}=req.body;
        const apagar= await Usuarios.update({apagado:1},{where:[{email:email}]});
        res.status(200).json({msg:"ok",data:req.body});
    }catch(e){
        res.status(200).json({msg:"Erro ao apagar o registro.",data:req.body});
    }
})


module.exports = router;