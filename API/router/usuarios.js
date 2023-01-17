var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var validator = require('validator');
const TblUsuarios = require('../models/tblusuario');
const { Connection, DataTypes, privateKey, TokenExpire} = require("./config");
const Usuarios = TblUsuarios(Connection, DataTypes);
const salt = bcrypt.genSaltSync(10);


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

async function usuarioExiste(req, res, next){
    const {email} = req.body;
    req.usuarioExiste=await Usuarios.findOne({where:{email:email, apagado:0}});
    next();
}
 
//cadastrar 
router.post('/cadastrar', validarCadastro, usuarioExiste, async  (req, res) => {
    const {nome, email, senha} = req.body;
    if(req.usuarioExiste==null){
        var token = jwt.sign({ email: email}, privateKey, { expiresIn: TokenExpire });
        const CreateUsuarios=await Usuarios.create({
            nome: nome,
            email: email,
            senha: bcrypt.hashSync(senha,salt),
            token: token,
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
router.get('/all', async (req, res) => { 
    const AllUsuarios=await Usuarios.findAll({where : {apagado:0}});
    res.status(200).json({ action: 'Listar Usuarios', data : AllUsuarios});
})

//mostrar apenas um
router.get('/:email', async (req, res) => {
    console.log(req.params.email)
    res.status(200).json({});
})

//atualizar um cadatro
router.put('/', async (req, res) => {
    //recebe um formulario
    res.status(200).json({});
})

//apagar um cadastro
router.delete('/:id', async (req, res) => {
    res.status(200).json({});
})

module.exports = router;