"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { useToast } from '@/hooks/ToastContext';
import { FaCopy } from "react-icons/fa";
 

const CopyMessage = ({ message }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message); // Copy the message to clipboard
    setIsCopied(true);

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Message Display */}
      <p className="text-gray-700 text-lg">{message}</p>

      {/* Copy Icon */}
      <div
        className="cursor-pointer p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
        onClick={handleCopy}
      >
        <FaCopy size={20} />
      </div>

      {/* Copied Animation */}
      <AnimatePresence>
        {isCopied && (
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
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
  const [showShare,setShowShare]=useState(false);
  const { showToast } = useToast();
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
     const passWordNew=password.replace(/[^a-zA-Z]/g, '');
     
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
      const response = await axios.post("http://localhost:3001/createChat", {
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
      console.log(response.data.chatRoom);
    } catch (error) {
      console.log(error);
    } finally {
    //   setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen"  style={{
        backgroundImage: "url(/create/wallpaper1.jpg)",
        backgroundSize: 'contain',  // This ensures the image keeps its aspect ratio
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents repeating the image
        width: '100%',
        height: '100vh',  // Adjust height as per your needs
      }} >
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
            value={username}
            type="text"
            placeholder="Username"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
            <CopyMessage message={createdLink} />
            
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
    </div>
  );
};

export default CreateRoomComponent;