const Ticket = require('./ticket');

class TicketList {

    constructor() {
        this.ultimoNumero = 0;

        this.pendientes = []; // iniciaran en pendientes y pasaran a asignados
        this.asignados  = [];

    }

    /**
     * incrementa la variable ultimonumero que es el nuevo numero llamado
     */
    get siguienteNumero() {
        this.ultimoNumero++;
        return this.ultimoNumero;
    }

    /**
     * get de 3 que se verán en las tarjetas y 10 en el historial
     */
    get ultimos13() {
        return this.asignados.slice(0,13);
    }

    /**
     * nueva instancia de la clase Ticket y push a el array pendientes
     * @returns nuevo ticket creado
     */
    crearTicket() {
        const nuevoTicket = new Ticket( this.siguienteNumero );
        this.pendientes.push( nuevoTicket );
        return nuevoTicket;
    }

    /**
     * pasar del array de pendientes a asignados
     * @param {*} agente agente asignado
     * @param {*} escritorio escritorio en el que esta agente
     * @returns 
     */
    asignarTicket( agente, escritorio ) {

        if ( this.pendientes.length === 0 ) {
            return null;
        }

        const siguienteTicket = this.pendientes.shift();

        siguienteTicket.agente = agente;
        siguienteTicket.escritorio = escritorio;

        this.asignados.unshift( siguienteTicket );

        return siguienteTicket;
    }


}


module.exports = TicketList;