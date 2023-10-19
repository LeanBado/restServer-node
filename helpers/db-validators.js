const Rol = require('../models/rol')
const usuario = require('../models/usuario')
const Categoria = require("../models/categoria");
const Producto = require('../models/producto');

const esRolValido = async(rol='') =>{
    const existeRol = await Rol.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la dB`)
    }
}

const mailExiste = async (correo) => {
    const existeMail = await usuario.findOne({correo})
        if(existeMail){
            throw new Error(`El mail ${correo} ya esta registrado en la dB`)
            // return res.status(400).json({
            //     msg: 'EL CORREO YA ESTA REGISTRADO'
            // })
        }
}

const existeUsuarioId = async(id) => {
    const existeUsuario = await usuario.findById(id)
        if(!existeUsuario){
            throw new Error(`El id '${id}' no existe en la dB`)
            // return res.status(400).json({
            //     msg: 'EL CORREO YA ESTA REGISTRADO'
            // })
        }
}

const existeCategoriaId = async(id) => {
    const existeCategoria = await Categoria.findById(id)
        if(!existeCategoria){
            throw new Error(`El id '${id}' no existe en la dB`)
            
        }
}

const existeProductoId = async(id) => {
    const existeProducto = await Producto.findById(id)
        if(!existeProducto){
            throw new Error(`El id '${id}' no existe en la dB`)
            
        }
}
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluye = colecciones.includes(coleccion)
    if(!incluye){
        throw new Error(`La coleccion ${coleccion} no es permitida`)
    }
    return true
}


module.exports = {
    esRolValido,
    mailExiste,
    existeUsuarioId,
    existeCategoriaId,
    existeProductoId,
    coleccionesPermitidas
}