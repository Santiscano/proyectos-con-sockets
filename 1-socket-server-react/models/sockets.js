

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            
            // socket.emit('mensaje-bienvenida', {
            //     msg: 'Bienvenido al servidor socket',
            //     fecha: new Date()
            // })

            // Escuchar evento: mensaje-to-server
            socket.on('mensaje-to-server', ( data ) => {
                console.log( data );
                
                this.io.emit('mensaje-from-server', data );
                // si fuera socket el que emite no se enviaria a todos los que esten conectados sino solo a los que este conectado al namespace
                // this.socket.emit('mensaje-from-server', data );
            });
            
        
        });
    }


}


module.exports = Sockets;