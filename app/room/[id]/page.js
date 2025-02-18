"use client";
import {useState,useEffect,React} from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import axios from "axios";
import Chat from "@/components/Chat";
import JoinComponent from "@/components/join/JoinComponent";
export default function BlogPostPage({ params }) {
   const router=useRouter();
    const { id } =use(params); // Access the dynamic route parameter
     const [roomName,setRoomName]=useState("");
     const [isCreator,setIsCreator]=useState(false);
     const [showComponent,setShowComponent]=useState(false);
     const [joinUser,setJoinUser]=useState("");
     const [password,setPassword]=useState("");
        useEffect(()=>{
             if(localStorage.getItem("myRoom") || localStorage.getItem("joinedRoom")){
              console.log("Room Creator Joined Group");
              setIsCreator(true);
              setShowComponent(true);
             }
             else{
              setShowComponent(true);
              console.log("Room Joiner is in the Room");
             }
        },[]);
        const joinHandle=async ()=>{
            try {
                if(!roomName || !joinUser || !password){
                    alert("Fill")
                    return;
                }
                const response= await axios.post(`${  process.env.NEXT_PUBLIC_DEPLOYBACKEND}/checkChat`,
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
                const savedObject={
                  joinUser,
                  roomName,
                }
                localStorage.setItem("joinedRoom",JSON.stringify(savedObject));
                
                console.log(savedObject);
              
                 console.log(response.data);
                 router.push("/chatRoom");
              } catch (error) {
                 console.log(error);
              }
        }
    return (
      <>
       {
        showComponent && (
                     <JoinComponent/>
        )
       }
       
       
        </>
    );
}
