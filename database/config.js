const mongoose = require('mongoose')
var colors = require('colors');

const dbConnection = async () => {


    try {

        await mongoose.connect(process.env.MONGODB_ATLAS_CNN)
        console.log('base de datos conectada correctamente'.bgGreen)

    } catch (error) {
        console.log(error)
        throw new Error('Error al conectarse a la base de datos'.bgRed)
    }
}

module.exports = {
    dbConnection
}