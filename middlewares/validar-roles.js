


const validarRol = (req = request, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'se quiere verificar el rol sin validar el token primero'
        })
    }

    const {rol, nombre} = req.usuario[0]
    console.log(req.usuario)
    console.log(nombre)
    console.log(rol)
    if(rol !== "ADMIN_ROL"){
        return res.status(401).json({
            msg: `${nombre} NO TIENE EL ROL VALIDO PARA LA ACCION DESEADA`
        })
    }


    next()
}
const tieneRol = (...roles) => {
    return (req, res, next) => {
        if(!req.usuario[0]){
            return res.status(500).json({
                msg: 'se quiere verificar el rol sin validar el token primero'
            })
        }
        if(!roles.includes(req.usuario[0].rol)){
            return res.status(401).json({
                msg: `le falta tener uno de los siguientes roles: ${roles}`,
                usuario: req.usuario[0].rol
            })
        }
        
        next()

    }



}

module.exports = {
    validarRol,
    tieneRol
}