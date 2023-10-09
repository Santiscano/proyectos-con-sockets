const Marcadores = require('./marcadores');


class Sockets {

    constructor( io ) {

        this.io = io;

        this.marcadores = new Marcadores();  // es la clase de marcadores del mapa

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            socket.emit( 'marcadores-activos' , this.marcadores.activos );

            socket.on( 'marcador-nuevo', ( marcador ) => {  // { id, lng, lat }
                this.marcadores.agregarMarcador( marcador );
                
                socket.broadcast.emit( 'marcador-nuevo', marcador ) // lo reciben todos menos el que lo recibio
                // this.io.emit( 'marcador-nuevo', marcador ) // lo reciben todos incluido quien lo envio

            });

            socket.on( 'marcador-actualizado', (marcador) => {
                this.marcadores.actualizarMarcador( marcador );
                socket.broadcast.emit( 'marcador-actualizado', marcador );
            });
            
        
        });
    }


}


module.exports = Sockets;