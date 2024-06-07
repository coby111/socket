/**
 * Cliente Socket-io para establecer la conexión con el servidor Socket.IO
 * @module socket
 */

import { io } from 'socket.io-client';

/**
 * Establece la conexión del cliente con el servidor
 * @type {Socket}
 */
const socket = io();

export default socket;
