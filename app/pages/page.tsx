"use client"
import { useEffect, useState } from 'react';
import socket from '../lib/socket';
import React from 'react';

export default function Home() {
  const [notification, setNotification] = useState('');

  const handleCloseNotification = () => {
    setNotification('');
  };

  useEffect(() => {
    socket.on('buttonClickNotification', (msg) => {
      setNotification(msg);
    });

    return () => {
      socket.off('buttonClickNotification');
    };
  }, []);

  const handleClick = () => {
    socket.emit('buttonClicked');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Botón para pruebas de notificación</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Click me
      </button>
      {notification && (
        <div className="fixed top-4 right-4 w-96 h-48 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center justify-center" role="alert">
          <span className="block sm:inline text-center">{notification}</span>
          <button className="absolute top-0 right-0 px-2 py-1" onClick={handleCloseNotification}>
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.354 5.354a2 2 0 10-2.828-2.828L10 7.172 7.172 4.344a2 2 0 10-2.828 2.828L7.172 10l-2.828 2.828a2 2 0 102.828 2.828L10 12.828l2.828 2.828a2 2 0 102.828-2.828L12.828 10l2.828-2.828z"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
