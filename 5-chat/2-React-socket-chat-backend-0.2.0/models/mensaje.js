const { Schema, model } = require('mongoose');


const MensajeSchema = Schema({

    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
},{
    timestamps: true
});


MensajeSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); // con esto elimina el __v del objeto que regresa
    return object;
});

module.exports = model('Mensaje', MensajeSchema );
