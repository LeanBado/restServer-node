const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
const fileUpload = require('express-fileupload')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            usuariosRoute : '/api/users',
            authPath: '/api/auth',
            categoriasPath : '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads',
        }
        

        this.conectarDB()

        this.middlewares()

        this.routes()

    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares() {
        this.app.use(express.static('public'))//directorio publico
        this.app.use(cors())//cors
        this.app.use(express.json())//lectura y parseo del body
        this.app.use(fileUpload({ //carga de archivos
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }))

    }

    routes() {
        this.app.use(this.paths.authPath, require('../routes/auth'))
        this.app.use(this.paths.usuariosRoute, require('../routes/usuarios'))
        this.app.use(this.paths.categoriasPath, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('servidor corriendo en puerto '+ this.port)
          })
    }

}



module.exports = Server