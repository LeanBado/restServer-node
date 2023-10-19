const {Router} = require('express')
const { check } = require('express-validator')
const {
     crearProductos,
     obtenerProductos, 
     obtenerProducto,
     actualizarProducto,
     borrarProducto
    } = require('../controllers/productos')
const { existeProductoId, existeCategoriaId } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/valida-campos')
const validarJWT = require('../middlewares/validar-jwt')
const { tieneRol } = require('../middlewares/validar-roles')

const router = Router()

router.get('/', obtenerProductos)

router.get('/:id',[
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    check('id').custom(existeProductoId), 
    validarCampos
] ,obtenerProducto) 

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria no es un ID valido de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaId), 
    validarCampos
],crearProductos)

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    check('id').custom(existeProductoId), 
    validarCampos
    ],
    actualizarProducto
) 

router.delete('/:id', [
    validarJWT,
    tieneRol('ADMIN_ROL'),
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    check('id').custom(existeProductoId), 
    validarCampos
    ],
    borrarProducto)

module.exports = router