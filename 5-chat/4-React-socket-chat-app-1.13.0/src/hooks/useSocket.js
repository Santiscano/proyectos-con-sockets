import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';


export const useSocket = ( serverPath ) => {
    
    const [ socket, setSocket ] = useState(null);
    const [ online, setOnline ] = useState(false);

    const conectarSocket = useCallback( () => {

        const token = localStorage.getItem('token');

        const socketTemp = io.connect( serverPath, { 
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true, // cuando se llame al cliente se crea una nueva conexion y no la conexion anterior
            query: {
                'x-token': token
            } // con query puedo enviar por aqui informacion al backend
        });
        setSocket( socketTemp );
    },[ serverPath ]);

    const desconectarSocket = useCallback( () => {
        socket?.disconnect();
    },[ socket ]);


    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}