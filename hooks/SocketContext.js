"use client";

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

// Create a Context for the Socket
const SocketContext = createContext(null);

// Custom Hook to use SocketContext
export const useSocket = () => {
  return useContext(SocketContext);
};

// SocketProvider component to wrap around your app
export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [socketId, setSocketId] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(`${process.env.NEXT_PUBLIC_DEPLOYBACKEND}/chat`);

    const socket = socketRef.current;

    // Listen for socket connection and get the socket ID
    socket.on('connect', () => {
      console.log(`Socket connected with ID: ${socket.id}`);
      setSocketId(socket.id);
    });
       console.log("socket:",socket);
    // Handle reconnection
    socket.on('reconnect', () => {
      console.log('Reconnected to server.');
      setSocketId(socket.id);
    });

    // Cleanup the socket connection when component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null; // Cleanup socket instance
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, socketId }}>
      {children}
    </SocketContext.Provider>
  );
};
