"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { useToast } from '@/hooks/ToastContext';
import { FaCopy } from "react-icons/fa";
import DraggableCircle from '../drag/drag';
import Image from 'next/image';
import BackButton from '../button/BackButton';
 

const CopyMessage = ({ message,copied }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    
    navigator.clipboard.writeText(message); // Copy the message to clipboard
    setIsCopied(true);
    copied();
    

    // Reset the copied state after 2 seconds
    setTimeout(() => {
        
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex items-center relative mt-8 space-x-4 p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Message Display */}
      <p className="text-gray-700 text-lg flex-1">{message}</p>

      {/* Copy Icon */}
      <div
        className="cursor-pointer flex-1 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
        onClick={handleCopy}
      >
        <FaCopy size={20} />
      </div>
    
       
       

      {/* Copied Animation */}
      <AnimatePresence>
        {isCopied && (
          <motion.div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const CreateRoomComponent = () => {
  const [step, setStep] = useState(1);
  const [roomName, setRoomName] = useState("");
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdLink,setCreatedLink]=useState("");
  const [imageLoaded,setImageLoaded]=useState(false);
  const [showShare,setShowShare]=useState(false);
  const { showToast } = useToast();
  const [showNextLink,setShowNextLink]=useState(false);
  const handleNextStep = () => {
    if(step == 1 && roomName == ""){
        triggerToast("You have to write a room","error")
    }
    else{
        setStep(step + 1);
    }
    
  };
  const triggerToast = (message,type) => {
    showToast(message, type);
  };
   
  const handleCreateRoom = async () => {
     const userNAME=username.replace(/[^a-zA-Z]/g, '');
     const passWordNew = password.replace(/[^a-zA-Z0-9]/g, '');
     
    if(userNAME.length == 0){
        triggerToast("You have to set username of your friend","error")
        return;
    }
    if(passWordNew.length == 0){
        triggerToast("You have to set password for your friend","error")
        return;
    }
    setIsProcessing(true);
    try {
      const response = await axios.post(`${  process.env.NEXT_PUBLIC_DEPLOYBACKEND}/createChat`, {
        roomName,
        joinUser:username,
        password
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response.data);
      setCreatedLink(response.data.chatRoom.link);
      showToast(`${roomName} created successfully`,"success");
      setShowShare(true);
      const user = localStorage.getItem("registeredUser");
      localStorage.setItem("myRoom", roomName);
      localStorage.setItem("roomLink",response.data.chatRoom.link);
      setIsProcessing(false);
      console.log(response.data.chatRoom);
    } catch (error) {
        const status=error.response.status;
        if(status == 400){
          showToast(`There is A room With ${roomName} in the database`,'warning');
          setIsProcessing(false);
        }
        else{
          showToast(`Your Name Not Created Sorry!`,'warning');
          setIsProcessing(false);
        }
      console.log(error);
    } finally {
     console.log("Finally");
    }
  };
  const handleCopied =()=>{
    setShowNextLink(true);
  }

  return (
    <>
     {
      !imageLoaded && (
        <div
         className=" flex flex-col absolute items-center bg-white bg-opacity-50 justify-center inset-y-10 rounded-[24px]"
        style={{
          width: "430px",
           
        }}
        >
        </div>
      )
     }
    <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={imageLoaded ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="relative flex flex-col items-center justify-center h-full rounded-[24px]"
    style={{
      width: "430px",
      height: "100%",
    }}
  >
    <BackButton  />
    <Image
      src="/create/wallpaper1.jpg"
      alt="Background"
      fill
      onLoad={() => {
        setTimeout(() => {
          setImageLoaded(true);
        }, 300);
      }}
      className="rounded-[24px] object-cover"
      style={{ zIndex: -1 }}
    />
    
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-y-4 text-red-400"
        >
          <input
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
            type="text"
            placeholder="Room Name"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleNextStep}
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Next
          </button>
        </motion.div>
      )}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-y-4 text-red-400"
        >
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username || "" }
            type="text"
            placeholder="Username"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleCreateRoom}
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Create Room
          </button>
        </motion.div>
      )}
      {
        showShare && (
            <CopyMessage message={createdLink} copied={handleCopied} />
            
        )
      }
      {
        showNextLink && (
            <DraggableCircle room={roomName} link={"/chat"} />
        )
      }
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-red-400"
        >
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
          <span>Processing...</span>
        </motion.div>
      )}
    </motion.div>
    </>
  );
};

export default CreateRoomComponent;