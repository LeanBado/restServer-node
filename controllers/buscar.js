const {response} = require('express')
const Categoria = require('../models/categoria')
const Producto = require('../models/producto')
const Usuario = require('../models/usuario')
const { ObjectId} = require('mongoose').Types


const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles',
]

const buscarUsuarios = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino)//devuelve true o false

    if(esMongoId){
        const usuario = await Usuario.findById(termino)
       return res.json({
            results: (usuario) ? [usuario]: []
        })
    }

    const regex = new RegExp(termino, 'i')
    const usuarios = await Usuario.find({
        $or:[{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    })
    
        res.json({
        results: usuarios
        })
}

const buscarCategorias = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino)//devuelve true o false

    if(esMongoId){
        const categoria = await Categoria.findById(termino)
       return res.json({
            results: (categoria) ? [categoria]: []
        })
    }
    
    const regex = new RegExp(termino, 'i')
    const categoria = await Categoria.find({nombre: regex})
    
        res.json({
        results: categoria
        })
}

const buscarProductos = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino)//devuelve true o false

    if(esMongoId){
        const productos = await Producto.findById(termino)
       return res.json({
            results: (productos) ? [productos]: []
        })
    }
    
    const regex = new RegExp(termino, 'i')
    const producto = await Producto.find({nombre: regex})
    
        res.json({
        results: producto
        })
}

const buscar = (req, res = response) => {

    const {coleccion, termino}  = req.params

    if(!coleccionesPermitidas.includes(coleccion)){
       return res.status(400).json({
            msg: `las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
       case 'usuarios':
        buscarUsuarios(termino, res)
       break
       case 'categorias':
        buscarCategorias(termino, res)
       break
       case 'productos':
        buscarProductos(termino, res)
       break
       default:
        res.status(500).json({
            msg: `se le olvido hacer la busqueda`
        })
    }

}

module.exports = {
    buscar
}