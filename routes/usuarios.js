const {Router} = require('express')
const { check } = require('express-validator')
const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete} = require('../controllers/usuarios')
const { esRolValido, mailExiste, existeUsuarioId } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/valida-campos')
const validarJWT = require('../middlewares/validar-jwt')
const { validarRol, tieneRol } = require('../middlewares/validar-roles')

const router = Router()

router.get('/', usuarioGet )

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','Es obligatorio +6 caracteres en el password').isLength({min: 6}),
    check('correo','El correo no es válido').isEmail(),
    check('correo','El correo ya existe').custom(mailExiste),
    check('rol').custom((rol) => esRolValido(rol)),
    validarCampos
    
] ,usuarioPost)

router.put('/:id',[
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom((rol) => esRolValido(rol)),

    validarCampos,
] , usuarioPut)

router.delete('/:id', [
    validarJWT,
    //validarRol,
    tieneRol('ADMIN_ROL'),
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    check('id').custom(existeUsuarioId),

    validarCampos,
],usuarioDelete)

module.exports = router