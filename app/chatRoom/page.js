"use client";

import React,{useEffect,useState,useRef} from 'react'
import { io } from 'socket.io-client';
function  ChatRoom() {
    const [firstUser,setFirstUser]=useState("");
    const [secondUser,setSecondUser]=useState("");
    const [roomName,setRoomName]=useState("");
    const socketRef=useRef(null);
     
    useEffect(()=>{
       const savedUserData=JSON.parse(localStorage.getItem("joinedRoom"));
       const {joinUser,roomName}=savedUserData;
       setFirstUser(joinUser);
       setRoomName(roomName);
       socketRef.current = io("http://localhost:3001/room");
       socketRef.current.emit("joinRoom",roomName);
       socketRef.current.on("message",(data)=>{
        console.log(data);
       })

    },[]);
  return (
    <div>
        <p>
           {firstUser}
           {roomName}
        </p>
    </div>
  )
}

export default  ChatRoom