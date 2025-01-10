 "use client";
import { useEffect } from "react";
 import { io } from "socket.io-client";

 const socket =io("http://localhost:3001");
export default function  Home() {
   useEffect(()=>{
        socket.emit("client_ready","hello from client");
   },[]);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    
    </div>
  );
}
