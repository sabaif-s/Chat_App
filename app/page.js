"use client";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import LandingPage from "@/components/Landing/Landing";
import { useSocket } from '@/hooks/SocketContext';

export default function Home() {
  const socketRef = useRef(null);
  const [socketId, setSocketId] = useState(null);
  const [heightState,setHeightState]=useState(null);
  
  const { socket } = useSocket();
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (socket) {
      socket.emit('send_message', message);
    }
  };

  // useEffect(() => {
  //   if (socket) {
  //     socket.on('receive_message', (data) => {
  //       console.log('Received message:', data);
  //     });
  //   }

  //   // Cleanup on component unmount
  //   return () => {
  //     if (socket) {
  //       socket.off('receive_message');
  //     }
  //   };
  // }, [socket]);

  
  // Function to initialize socket connection when startChat is true
  // useEffect(() => {
     
  //     socketRef.current = io(  process.env.NEXT_PUBLIC_DEPLOYBACKEND);

  //     // Listen for the 'connect' event to get the socket ID
  //     const socket = socketRef.current;
  //     const updateSocketId = () => {
  //       console.log(`Socket connected with ID: ${socket.id}`);
  //       setSocketId(socket.id);
  //     };
      
  //     socket.on("connect", updateSocketId);
  //     socket.on("reconnect", () => {
  //       console.log("Reconnected to server.");
  //       updateSocketId();
  //     });

  //     // Handle received messages
  //     socket.on("user1_message", (data) => {
  //       console.log("Received message from user1:", data);
  //     });
  //     socket.on("user2_message", (data) => {
  //       console.log("Received message from user2:", data);
  //     });

  //     // Cleanup function when startChat is false
  //     return () => {
  //       if (socketRef.current) {
  //         socketRef.current.disconnect();
  //         socketRef.current = null;  // Cleanup the socket instance
  //       }
  //     };
    

    
  // }, []);
  // useEffect(()=>{
  // console.log(window.innerHeight);
  // setHeightState(window.innerHeight);
  // },[]);
 
   

   

   

  return (
    <>
    <div className="w-full h-full flex justify-center" >
        <div className="w-full h-full md:py-4 flex justify-center" >
        <LandingPage key={"landing"} height={heightState} />
        </div>
   </div>
    </>
  );
}
