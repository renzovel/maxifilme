var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var validator = require('validator');
const multer  = require('multer');
const { Connection, DataTypes, privateKey, TokenExpire, Op} = require("./config");
const TblFilmes = require('../models/tblfilme');
const TblGeneros = require('../models/tblgenero');
const TblGenerosFilmes = require('../models/tblgenerofilme');
const TblUsuarios = require('../models/tblusuario');
const Filmes = TblFilmes(Connection, DataTypes);
const Generos = TblGeneros(Connection, DataTypes);
const GenerosFilmes = TblGenerosFilmes(Connection, DataTypes);
const Usuarios = TblUsuarios(Connection, DataTypes);
const salt = bcrypt.genSaltSync(10);
var path = require("path");

const upload = multer({ dest: path.resolve(`${__dirname}/../uploads/images/`)})




const isAdmin=(req,res,next)=>{
    req.usuarioExiste.nivel === 1?next():res.status(401).json({msg:"Usuario inválido, acesso negado.",data:{}}).end();
}

async function ValidateToken(req, res, next){
    let meuToken = req.headers['access-token'];
    jwt.verify(meuToken, privateKey, async (erro, decode)=>{
        if(erro===null){
            try{
                req.usuarioExiste=await Usuarios.findOne({where:{email:decode.email}});
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
    let items={}, {nome, descricao, diretor, atores, generos } = req.body;
    if(!validator.isAlpha(nome)||!validator.isLength(nome,{min:4,max:40})||validator.isEmpty(nome, {ignore_whitespace:false})){
        items.nome=nome;
    }
    if(!validator.isLength(descricao,{min:4,max:200})||validator.isEmpty(descricao, {ignore_whitespace:false})){
        items.descricao=descricao;
    }
    if(!validator.isAlpha(diretor)||!validator.isLength(diretor,{min:4,max:10})||validator.isEmpty(diretor, {ignore_whitespace:false})){
        items.diretor=diretor;
    }
    if(typeof atores==="string"){
        atores = req.body.atores = JSON.parse(req.body.atores);
    }
    if(typeof atores==="object"){
        if(atores.length<1){
            items.atores=atores;
        }
    }else{
        items.atores=atores;
    }
    if(typeof generos==="string"){
        generos = req.body.generos = JSON.parse(req.body.generos);
    }
    if(typeof generos==="object"){
        if(generos.length<1){
            items.generos=generos;
        }
    }else{
        items.generos=generos;
    }
    if(Object.keys(items).length>0){
        res.status(200).json({msg:"Dados inválidos.",data:items});
    }else{
        next();
    }
}


async function generosExiste(req, res, next){
    req.generosExiste=await Generos.findAll({where:[{id:req.body.generos},{apagado:0}]});
    if(req.generosExiste!==null){
        next();
    }else{
        res.status(200).json({msg:"Gêneros não registrados.",data:req.body});
    }
}

//cadastrar 
router.post('/cadastrar', ValidateToken, isAdmin,  upload.single('image', 1), validarCadastro, generosExiste, async  (req, res) => {
    const items= {nome, descricao, diretor, atores, generos} = req.body;
    try{
        const CreateFilme=await Filmes.create({
            nome: nome,
            descricao: descricao,
            diretor:diretor,
            atores: JSON.stringify(atores),
            imagen: req.file.filename,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        if(typeof CreateFilme.null==="number"){
            if(CreateFilme.null>=0){
                let RegistrosGeneros=[];
                generos.forEach(generoId => {
                    RegistrosGeneros.push({
                        tblgeneroId:generoId,
                        tblfilmeId:CreateFilme.null
                    });
                });
                try{
                    const CreateGenerosFilmes = await GenerosFilmes.bulkCreate(RegistrosGeneros);
                    req.body.imagen=req.file.filename;
                    res.status(200).json({msg:"ok",data:req.body});
                }catch(e){
                    res.status(200).json({msg:"Erro ao registrar os Gêneros",data:req.body});
                }
            }else{
                res.status(200).json({msg:"Erro ao cadastrar o filme.",data:req.body});
            }
        }else{
            res.status(200).json({msg:"Filme nao registrado.",data:req.body});
        }
    }catch(e){
        res.status(200).json({msg:"Erro ao cadastrar o filme.",data:req.body});
    }
})

router.get('/all/:str', async (req, res)=>{
    try{
        let {str} = req.params;
        const AllFilmes=await Filmes.findAll({where:[
            {[Op.or]: [
              {
                nome: {
                  [Op.like]: `%${str}%`
                }
              },
              {
                descricao: {
                  [Op.like]: `%${str}%`
                }
              },
              {
                diretor: {
                  [Op.like]: `%${str}%`
                }
              },
              {
                atores: {
                  [Op.like]: `%${str}%`
                }
              }
            ]},
            {apagado:0}
          ]})
        res.status(200).json({msg:"ok",data:AllFilmes});
    }catch(e){
        res.status(200).json({msg:"Erro ao consultar o filme.",data:req.body});
    }
})

router.get('/diretor/:str', async (req, res)=>{
    try{
        const AllFilmes=await Filmes.findAll({where:[            
            {diretor: {
                [Op.like]: `%${req.params.str}%`
            }},
            {apagado:0}
          ]})
        res.status(200).json({msg:"ok",data:AllFilmes});
    }catch(e){
        console.log(e)
        res.status(200).json({msg:"Erro ao consultar o filme.",data:req.body});
    }
})

router.get('/atores', async (req, res)=>{
    try{
        let atores = [];
        req.body.forEach((items)=>{
            atores.push({
                atores: {
                  [Op.like]: `%${items}%`
                }
              });
        })
        const AllFilmes=await Filmes.findAll({where:[
            {[Op.or]: atores},
            {apagado:0}
          ]})
        res.status(200).json({msg:"ok",data:AllFilmes});
    }catch(e){
        console.log(e)
        res.status(200).json({msg:"Erro ao consultar o filme.",data:req.body});
    }
})


router.get('/generos', async (req, res)=>{
    Filmes.belongsTo(GenerosFilmes);
    GenerosFilmes.belongsTo(Generos);
    try{
        let generos = [];
        req.body.forEach((items)=>{
            generos.push({
                nome: {
                  [Op.like]: `%${items}%`
                }
              });
        })
        const AllGeneros=await Generos.findAll({where:[
            {[Op.or]: generos},
            {apagado:0}
          ]})
        if(AllGeneros.length>0){
            let searchgeneros=[];
            AllGeneros.forEach((item)=>{
                searchgeneros.push(item.id);
            })
            const AllFilmes=await Filmes.findAll({
                include: [{
                    model: GenerosFilmes,
                    include: [{
                      model: Generos
                    }]
                }]
            });
            res.status(200).json({msg:"ok",data:AllFilmes});
        }else{
            res.status(200).json({msg:"ok",data:{}});
        }        
    }catch(e){
        console.log(e)
        res.status(200).json({msg:"Erro ao consultar o filme.",data:req.body});
    }
})


module.exports = router;