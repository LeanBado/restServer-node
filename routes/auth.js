const {Router} = require('express')
const { check } = require('express-validator')
const { loginController, googleControllerSignIn } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/valida-campos')

const router = Router()

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], loginController )

router.post('/google',[
    check('id_token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos
], googleControllerSignIn )

module.exports = router