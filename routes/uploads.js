const {Router} = require('express')
const { check } = require('express-validator')
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads')
const { coleccionesPermitidas } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/valida-campos')
const { validarArchivo } = require('../middlewares/validar-archivo')

const router = Router()

router.post('/',validarArchivo,cargarArchivo)
router.put('/:coleccion/:id',[
    check('id', 'el ID debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarArchivo,
    validarCampos
],
    actualizarImagen)

router.get('/:coleccion/:id',[
    check('id', 'el ID debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos,
],
    mostrarImagen)


module.exports = router