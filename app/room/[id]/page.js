"use client";
import {useState,useEffect,React} from "react";
import { use } from "react";
import axios from "axios";
export default function BlogPostPage({ params }) {
    const { id } =use(params); // Access the dynamic route parameter
     const [roomName,setRoomName]=useState("");
        const [joinUser,setJoinUser]=useState("");
        const [password,setPassword]=useState("");
        const joinHandle=async ()=>{
            try {
                if(!roomName || !joinUser || !password){
                    alert("Fill")
                    return;
                }
                const response= await axios.post("http://localhost:3001/checkChat",
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
                //  setCreatedLink(response.data.chatRoom.link);
                 console.log(response.data);
              } catch (error) {
                 console.log(error);
              }
        }
    return (
        <div>
            <h1>Blog Post ID: {id}</h1>
            <input 
        onChange={(e)=>{
                  setRoomName(e.target.value)
        }}
        value={roomName}
             required
         type="text" placeholder="Room Name" />
        <input
        required
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
        onClick={joinHandle}
        >JOIN ROOM</button>
        </div>
    );
}
