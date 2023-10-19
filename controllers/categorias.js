const { response } = require("express");
const Categoria = require("../models/categoria");

//obtenerCategoriaS - paginado - total - populate
const obtenerCategorias = async(req, res = response) => {

    const {limite = 5, desde = 0} = req.query

    const [coleccion, conteo] = await Promise.all([
        Categoria.find({estado: true})
            .skip(desde)
            .limit(limite)
            .populate('usuario','nombre')
        ,
        Categoria.count({estado: true})
    ])   

    
    res.json({
        msg: 'get API - obtenerCategorias',
        conteo,
        coleccion
    })
}

//obtenerCategoria - populate, tiene que regresar un {} de la categoria
const obtenerCategoria = async(req, res = response) => {

    const {id} = req.params

    const [categoria] = await Categoria.find({_id: id}).populate('usuario','nombre')
    
    res.json({
        msg: 'get API - obtenerCategoria',
        categoria
    })
}


const crearCategorias = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({nombre})
    

    if(categoriaDB){
        res.status(400).json({
            msg: `la categoria ${categoriaDB.nombre} ya existe`
        })
    }
     const data = {
        nombre,
        usuario: req.usuario[0].id
    }

    const categoria =  new Categoria(data)
    await categoria.save()

    res.status(201).json(categoria) 
    
}

//actualizarCategoria 
const actualizarCategoria = async (req, res = response) => {
    
    const {id} = req.params
    const {estado, usuario, ...data} = req.body

    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id
    
   
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true}) 
    
    res.json({
            msg: 'put API - categoria actualizada OK',
            categoria
        }
    )  
    
}

//borrarCategoria - estado: false
const borrarCategoria = async (req, res = response) => {
    
    const {id} = req.params
        
    const categoriaDelete = await Categoria.findByIdAndUpdate(id,{estado: false}, {new: true})

    res.json({
        msg: 'delete API - controlador EXITOSO',
        msg2: 'categoria borrada a continuacion:',
        categoriaDelete,
    })
    
}

module.exports = {
    crearCategorias,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}