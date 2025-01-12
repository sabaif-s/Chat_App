"use client";
import React,{useEffect,useState} from 'react'
import { io } from 'socket.io-client';

function  CreatorChatRoom() {
    useEffect(()=>{
        const socket=io("http://localhost:3001/room");
        const myRoom=localStorage.getItem("myRoom");
        socket.emit("joinRoom",myRoom);
        socket.on("message",(data)=>{
            console.log(data);
        })
    },[]);
  return (
    <div>

    </div>
  )
}

export default  CreatorChatRoom