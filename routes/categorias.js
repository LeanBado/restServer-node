const {Router} = require('express')
const { check } = require('express-validator')
const { crearCategorias, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias')
const { existeCategoriaId } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/valida-campos')
const validarJWT = require('../middlewares/validar-jwt')
const { tieneRol } = require('../middlewares/validar-roles')

const router = Router()

router.get('/', obtenerCategorias)

router.get('/:id',[
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    check('id').custom(existeCategoriaId), 
    validarCampos
] ,obtenerCategoria)

router.post('/', [
    validarJWT,
    validarCampos
],crearCategorias)

// actualiza por el ID - privado cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    check('id').custom(existeCategoriaId), 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
    ],
    actualizarCategoria
)

// borra una categoria - solo si es admin
router.delete('/:id', [
    validarJWT,
    tieneRol('ADMIN_ROL'),
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    check('id').custom(existeCategoriaId), 
    validarCampos
    ],
    borrarCategoria)

module.exports = router