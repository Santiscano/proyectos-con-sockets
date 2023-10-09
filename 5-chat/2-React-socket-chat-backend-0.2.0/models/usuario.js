const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: false
    }
});

// asi evitamos que se envie el password - y debe ser con una funcion normal, no sirve la arrow function
UsuarioSchema.method('toJSON', function() {
    // extrae version, id, password y todo lo demas lo guarda en el objeto object 
    const { __v, _id, password, ...object } = this.toObject();
    // guarda de nuevo el id en uid
    object.uid = _id;
    // retorna el nuevo objeto como modelo o usuario
    return object;
});



module.exports = model('Usuario', UsuarioSchema );
