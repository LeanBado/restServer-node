const { response } = require("express");
const Producto = require("../models/producto");

 const obtenerProductos = async(req, res = response) => {

    const {limite = 5, desde = 0} = req.query

    const [coleccion, conteo] = await Promise.all([
        Producto.find({estado: true})
            .skip(desde)
            .limit(limite)
            .populate('usuario','nombre')
            .populate('categoria','nombre')
        ,
        Producto.count({estado: true})
    ])   

    
    res.json({
        msg: 'get API - obtenerProductos',
        conteo,
        coleccion
    })
} 

 const obtenerProducto = async(req, res = response) => {

    const {id} = req.params

    const [producto] = await Producto.find({_id: id}).populate('usuario','nombre')
    
    res.json({
        msg: 'get API - obtenerProducto',
        producto
    })
} 


const crearProductos = async (req, res = response) => {
    const productoSolicitado = req.body

    const productoDB = await Producto.findOne({nombre: productoSolicitado.nombre.toUpperCase()})
    

    if(productoDB){
       return res.status(400).json({
            msg: `el producto ${productoDB.nombre} ya existe`
        })
    }
     const data = {
        nombre: productoSolicitado.nombre.toUpperCase(),
        usuario: req.usuario[0].id,
        categoria: productoSolicitado.categoria,
        precio: productoSolicitado.precio,
        descripcion: productoSolicitado.descripcion
    }

    const producto =  new Producto(data)
    await producto.save()

    res.status(201).json(producto) 
    
}

const actualizarProducto = async (req, res = response) => {
    
    const {id} = req.params
    const {estado, usuario, ...data} = req.body

    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario[0]._id
    
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true}) 
    
    res.json({
            msg: 'put API - producto actualizado OK',
            producto
        }
    )   
}

const borrarProducto = async (req, res = response) => {
    
    const {id} = req.params
        
    const productoDelete = await Producto.findByIdAndUpdate(id,{estado: false}, {new: true})

    res.json({
        msg: 'delete API - controlador EXITOSO',
        msg2: 'producto borrado a continuacion:',
        productoDelete,
    })
    
}

module.exports = {
    crearProductos,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}