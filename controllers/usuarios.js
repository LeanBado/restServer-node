const { response } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')


const usuarioGet = async(req, res = response) => {

    const {limite = 5, desde = 0} = req.query

    const [coleccion, conteo] = await Promise.all([
        Usuario.find({estado: true})
            .skip(desde)
            .limit(limite)
        ,
        Usuario.count({estado: true})
    ])   

    
    res.json({
        msg: 'get API - controlador',
        conteo,
        coleccion
    })
  }

const usuarioPost = async (req, res = response) => {

        const {nombre, correo, password, rol} = req.body
        const usuario = new Usuario({nombre, correo, password, rol})

        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save()

        res.json({
            msg: 'post API - controlador',
            usuario
        })
}

const usuarioPut = async(req, res = response) => {

    const {id} = req.params
    const {password, google, ...resto} = req.body

    if(password){
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
            msg: 'put API - controlador',
            usuario
        }
    )
}
const usuarioDelete = async (req, res = response) => {

    const {id} = req.params

    const usuarioAutenticado = req.usuario

    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false})

    res.json({
        msg: 'delete API - controlador EXITOSO',
        msg2: 'usuario borrado a continuacion:',
        usuario,
        usuarioAutenticado: usuarioAutenticado,
    })
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
  }