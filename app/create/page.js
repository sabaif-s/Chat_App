"use client";
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import CreateRoomComponent from '@/components/Create/CreateRoom';
function  CreateRoom() {
    const [roomName,setRoomName]=useState("");
    const [joinUser,setJoinUser]=useState("");
    const [password,setPassword]=useState("");
    const [createdLink,setCreatedLink]=useState("");

    const createButtonClicked=async ()=>{
      try {
        const response= await axios.post(`${  process.env.NEXT_PUBLIC_DEPLOYBACKEND}/createChat`,
          {
            roomName,
            joinUser,
            password
          },
          {
            headers:{
              "Content-Type":"application/json"
            }
          }
         )
         setCreatedLink(response.data.chatRoom.link);
         const user=localStorage.getItem("registeredUser");
         localStorage.setItem("myRoom",roomName);
         console.log(response.data.chatRoom);
      } catch (error) {
         console.log(error);
      }
              
    }
  return (
    <>
    {
      true && (
        <CreateRoomComponent/>
      )
    }
    
   
    </>
  )
}

export default  CreateRoom