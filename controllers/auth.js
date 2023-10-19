const {response} = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const generarJWT = require('../helpers/generarJWT')
const googleVerify = require('../helpers/google-verify')



const loginController = async(req, res = response) =>{

    const {correo, password} = req.body

    const check = await Usuario.findOne({correo})
    if(!check){
        return res.status(400).json({
            msg: 'email incorrecto/no encontrado en la BD'
        })
    }

    if(!check.estado){
        return res.status(400).json({
            msg: 'usuario no encontrado en la BD'
        })
    }

    const validPass = bcryptjs.compareSync(password, check.password)
    if(!validPass){
        return res.status(400).json({
            msg: 'password no coincide con el usuario/ inexistente'
        })
    }

    //TODO:generar JWT
    const token = await generarJWT(check.id)

    try {

        res.json({
            msg: 'loginController - OKEY',
            check,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'algo salio mal, hable con el admin.'
        })
        
    }
}

const googleControllerSignIn = async(req, res = response) =>{

    const {id_token} = req.body

    try {
        const {nombreGoogle, imgGoogle, correoGoogle} = await googleVerify(id_token)

        let usuarioExiste = await Usuario.findOne({correo: correoGoogle})
       
         if(!usuarioExiste){
            const data = {
                nombre: nombreGoogle,
                correo: correoGoogle,
                password: 'ABC',
                google: true,
                img: imgGoogle,
            }
            
             usuarioExiste = new Usuario(data)
             await usuarioExiste.save()
        }

        if(usuarioExiste.estado == false ){
            return res.status(401).json({
                 ok: 'false',
                 msg: 'acceso denegado - usuario borrado, hable con un admin. '
             })
         }

        const token = await generarJWT(usuarioExiste.id)


        res.json({
            msg: 'googleControllerSignIn - OKEY',
            usuarioExiste,
            token,
            id_token
        }) 

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: 'false',
            msg: 'el token de google no se pudo verificar'
        })
        
    }
}

module.exports= {
    loginController,
    googleControllerSignIn
}