const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')



const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg: 'no hay token en la petición'
        })
    }


    try {
        const {uid} =  jwt.verify(token, process.env.PRIVATEKEY)
        const usuarioAutenticado = await Usuario.find({_id: uid})
       

        if(!usuarioAutenticado[0].estado){
           return res.status(401).json({
                msg: 'usuario no valido - estado de usuario false'
            })
        }

        req.usuario = usuarioAutenticado
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'token no valido'
        })
    }
}

module.exports = validarJWT