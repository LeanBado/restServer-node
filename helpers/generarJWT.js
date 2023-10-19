const jwt = require('jsonwebtoken')


const generarJWT = (uid = '') =>{

    return new Promise((resolve,reject)=>{

        const payload = {uid}

        jwt.sign(payload,process.env.PRIVATEKEY,{
            expiresIn: '2h'
        },(error,token)=>{
            if(error){
                console.log(error)
                reject('no se pudo generar el token, ver en consola el error')
            } else{
                resolve(token)
            }
        })

    })

}


module.exports = generarJWT