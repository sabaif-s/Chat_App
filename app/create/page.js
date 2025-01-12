"use client";
import React,{useEffect,useState} from 'react'
import axios from 'axios';
function  CreateRoom() {
    const [roomName,setRoomName]=useState("");
    const [joinUser,setJoinUser]=useState("");
    const [password,setPassword]=useState("");
    const [createdLink,setCreatedLink]=useState("");

    const createButtonClicked=async ()=>{
      try {
        const response= await axios.post("http://localhost:3001/createChat",
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
    <div className='flex flex-col gap-y-4 text-red-400' >
        <input 
        onChange={(e)=>{
                  setRoomName(e.target.value)
        }}
        value={roomName}

         type="text" placeholder="Room Name" />
        <input
        onChange={(e)=>{
            setJoinUser(e.target.value)
  }}
  value={joinUser}
        type="text" placeholder="User Name" autoComplete='off' />
        <input
         onChange={(e)=>{
            setPassword(e.target.value)
  }}
  value={password}
        type="text" placeholder='Password' autoComplete="off" />
        <button
         onClick={createButtonClicked}
        >Create Chat</button>
        <div>
            <button>Copy Link</button>
            {
              createdLink != "" && (
                <p>
                  {createdLink}
                </p>
              )
            }
        </div>
    </div>
  )
}

export default  CreateRoom