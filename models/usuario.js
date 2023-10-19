const {Schema, model} = require('mongoose')


const usuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligarorio'],

    },
    correo:{
        type: String,
        required: [true, 'El correo es obligarorio'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligaroria'],
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: true,
        default: 'USER_ROL'
       // enum: ['ADMIN_ROL', 'USER_ROL']//valida el rol solo contra los 2 string que contiene el array
    },
    estado:{
        type: Boolean,
        default: true,
    },
    google:{
        type: Boolean,
        default: false,
    },

})

usuarioSchema.methods.toJSON = function(){//esto se hace asi para que cuando se haga la solicitud del router.post no mande en el mensaje
    const { __v, password, _id,...user } = this.toObject()//la contraseña y el __v; entonces cuando se manda a llamar el toJSON 
    user.uid = _id
       
    return user                      //se extrae el __v y la contraseña y se copia con el operador spread todos los valores menos esos 2 
}


module.exports = model('Usuario',usuarioSchema)