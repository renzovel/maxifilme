var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var validator = require('validator');
const TblUsuarios = require('../models/tblusuario');
const { Connection, DataTypes} = require("./config");
const Usuarios = TblUsuarios(Connection, DataTypes);
const salt = bcrypt.genSaltSync(10);
const privateKey = "55j6h5j4j55h3jhk4jh54kj5h4j5k455j4h5j4h54jh5";
const limite = Math.floor(Date.now() / 1000) - 30;

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

async function usuarioExiste(req, res, next){
    const {email} = req.body;
    req.usuarioExiste=await Usuarios.findOne({where:{email:email}});
    next();
}
 
//cadastrar 
router.post('/cadastrar', validarCadastro, usuarioExiste, async  (req, res) => {
    const {nome, email, senha} = req.body;
    if(req.usuarioExiste==null){
        var token = jwt.sign({ email: email, vence:  limite}, privateKey);
        const CreateUsuarios=await Usuarios.create({
            nome: nome,
            email: email,
            senha: bcrypt.hashSync(senha,salt),
            token: token,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        res.status(200).json({msg:"ok",data:true});
    }else{
        res.status(200).json({msg:"Usuario ja existe.",data:false});
    }
})

//mostrar todos 
router.get('/all', async (req, res) => { 
    const AllUsuarios=await Usuarios.findAll();
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

//login 
router.post('/login', async (req, res) => {
    res.status(200).json({});
})

module.exports = router;