const {Schema, model} = require('mongoose')


const rolSchema = Schema({
    rol:{
        type: String,
        required: [true, 'El rol es obligarorio'],

    },
})

module.exports = model('Roles',rolSchema)