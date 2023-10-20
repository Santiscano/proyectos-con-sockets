const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado,
        usuarioDesconectado,
        grabarMensaje,
        getUsuarios } = require('../controllers/sockets');


/**
 * @param {*} emit -> emite al cliente con el nombre que asigne
 * @param {*} broadcast -> emite a TODOS los clientes 
 * @param {*} on -> escucha las emisiones del cliente
 * @param {*} to -> para: es decir para que sea a un usuario en particular 
 */
class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

            //? AQUI PUEDO VER LO QUE LLEGO POR QUERY
            // console.log(socket.handshake.query);

            // * Validar el JWT
            const [ valido, uid ] = comprobarJWT( socket.handshake.query['x-token']  );

            // * Si el token no es válido, desconectar
            if ( !valido ) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            // * Actualiza base de datos con usuario conectado
            await usuarioConectado( uid );

            // *: Socket join, uid
            // * Unir al usuario a una sala de socket.io
            socket.join( uid );

            

            // TODO: Saber que usuario está activo mediante el UID

            // *: Emitir todos los usuarios conectados
            this.io.emit( 'lista-usuarios', await getUsuarios() )


            // *: Escuchar cuando el cliente manda un mensaje
            socket.on( 'mensaje-personal', async( payload ) => {
                const mensaje = await grabarMensaje( payload );
                // payload.para define para quien va el mensaje
                this.io.to( payload.para ).emit( 'mensaje-personal', mensaje );
                this.io.to( payload.de ).emit( 'mensaje-personal', mensaje );
            });
            

            // *: Disconnect y actualiza DB con desconectar y lista usuarios
            socket.on('disconnect', async() => {
                await usuarioDesconectado( uid );
                this.io.emit( 'lista-usuarios', await getUsuarios() )
            })
            
        
        });
    }


}


module.exports = Sockets;