const { validationResult } = require("express-validator")

const validarCampos = (req, res, next) => {

    const validatorErrors = validationResult(req)
    if(!validatorErrors.isEmpty()){
      return  res.status(400).json(validatorErrors)
    }

    next() //va next porque sino entra en el if
            //hace falta que siga y haga la proxima validacion y si tampoco entra en el if
            //que haga la proxima y asi hasta terminar con los check puestos en routes/usuarios
}

module.exports = {
    validarCampos
}