const { response } = require("express");
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { subirArchivo } = require("../helpers/subir-archivo");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");



const cargarArchivo = async (req, res = response) => {

  
  try {
    const direccionDeArchivo = await subirArchivo(req.files)
    res.status(200).json({
        msg: direccionDeArchivo
    })
    
  } catch (error) {
    res.status(400).json({
        msg: error
    })
  }
}

const actualizarImagen = async (req, res = response) => {

    
    const {id, coleccion} = req.params

    let modelo
    switch (coleccion) {
        case 'productos':
            modelo = await Producto.findById(id)
                if(!modelo){
                    return res.status(400).json({
                        msg: 'producto no valido'
                    })
                }
        break;
        
        case 'usuarios':
            modelo = await Usuario.findById(id)
                if(!modelo){
                    return res.status(400).json({
                        msg: 'usuario no valido'
                    })
                }
        break;
    
        default:
           return res.status(500).json({
                msg: 'te olvidaste de validar'
            })
        break;
    }

    if(modelo.img){
        const pathImagen = path.join(__dirname, '../uploads', coleccion,modelo.img)
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen)
        }
    }
    
    const nombre = await subirArchivo(req.files,undefined,coleccion)
    modelo.img = nombre
    await modelo.save()

    res.status(200).json({
        msg: 'actualizacion exitosa',
        modelo
    })
}

const mostrarImagen = async (req, res = response) => {

    const {id, coleccion} = req.params

    let modelo
    switch (coleccion) {
        case 'productos':
            modelo = await Producto.findById(id)
                if(!modelo){
                    return res.status(400).json({
                        msg: 'producto no valido'
                    })
                }
        break;
        
        case 'usuarios':
            modelo = await Usuario.findById(id)
                if(!modelo){
                    return res.status(400).json({
                        msg: 'usuario no valido'
                    })
                }
        break;
    
        default:
           return res.status(500).json({
                msg: 'te olvidaste de validar'
            })
        break;
    }

    if(modelo.img){
        const pathImagen = path.join(__dirname, '../uploads', coleccion,modelo.img)
        if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen)
        }
    }

    const pathNotFound = path.join(__dirname,'../assets/no-image.jpg')
    return res.sendFile(pathNotFound)
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}