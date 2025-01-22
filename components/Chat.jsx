"use client"; // Ensure this component is client-rendered in Next.js

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/ToastContext";
import { motion,AnimatePresence} from "framer-motion";
import { FaRegCommentDots } from "react-icons/fa";
import { io } from "socket.io-client";
import { FaCopy } from "react-icons/fa";
import axios from "axios";
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
    <div className="flex items-center mt-8 space-x-4 p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Message Display */}
      <p className="text-gray-700 text-lg flex-1">{message}</p>

      {/* Copy Icon */}
      <div
        className="cursor-pointer flex-1 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
        onClick={handleCopy}
      >
        <FaCopy size={20} />
      </div>
      <motion.span
  className="float-right absolute top-16 text-green-400 left-4 text-2xl"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: [0, -10, 0] }} // Bounce effect
  transition={{
    duration: 2, // Total time for one cycle
    repeat: 4, // Loops infinitely
    repeatType: "reverse", // Reverses animation direction
    ease: "easeInOut",
  }}
>
  Share With Your Friend
</motion.span>
       
       

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
const SelectionComponent = ({ elements, onSelect }) => {
   
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
     <>
    
    <div
     style={{width:"432px"}}
    className="grid grid-cols-1 hidden sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gradient-to-b from-red-100 to-pink-200 h-full">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="flex items-start justify-between bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            onSelect(element, index);
          }}
        >
          {/* Icon */}
          <FaRegCommentDots className="text-blue-500 text-xl mr-3" />

          {/* Text */}
          <h3
            className="px-4 py-2 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 cursor-pointer"
          >
            {element}
          </h3>

          {/* CopyMessage */}
          {/* {
            index == 0 &&  (
              <CopyMessage message={link} />
            )
          } */}
          
        </motion.div>
      ))}
    </div>
    <motion.div
      style={{ width: "432px" }}
      className="h-full overflow-y-auto flex justify-start py-2 flex-col gap-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Search Bar */}
      <motion.div
        className="bg-white rounded-lg flex px-2 justify-start items-center gap-x-2"
        variants={itemVariants}
      >
        <img src="/chat/search.png" className="w-10 h-10 object-cover" alt="" />
        <input
          type="text"
          placeholder="Search"
          className="text-gray-500 text-lg w-full bg-white h-full outline-none focus:ring-0 focus:border-transparent"
        />
      </motion.div>

      {/* Chat List */}
      <motion.div
        className="w-full bg-white rounded-lg py-4 px-2 flex flex-col items-start justify-start gap-y-4"
        variants={itemVariants}
      >
        <span className="text-black text-xl">People</span>
        <div className="flex flex-col w-full">
          {
            elements.map((element,index)=>(
              <motion.div
              key={index}
              className="flex cursor-pointer text-gray-500 w-full border-b-2 border-gray-200 flex-row justify-between gap-x-2 items-center"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-row items-center py-2 justify-start gap-x-2">
                <img src="/chat/profile.png" className="w-12 h-12 object-cover" alt="" />
                <div className="flex flex-col">
                  <span className="text-black text-lg">ANIL</span>
                  <span className="text-gray-500 text-sm">April fool's day</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span>Today,9.52pm</span>
                <img src="/chat/doubleThick.png" className="w-8 h-8" alt="" />
              </div>
            </motion.div>
            ))
          }
         
         
        </div>
      </motion.div>
    </motion.div>
    </>
  );
};
const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 ml-4 mb-4">
      <span className="text-gray-600 text-sm">Typing</span>
      <div className="flex space-x-1">
        <motion.div
          className="h-2 w-2 bg-gray-500 rounded-full"
          animate={{ y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: 0 }}
        ></motion.div>
        <motion.div
          className="h-2 w-2 bg-gray-500 rounded-full"
          animate={{ y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: 0.3 }}
        ></motion.div>
        <motion.div
          className="h-2 w-2 bg-gray-500 rounded-full"
          animate={{ y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: 0.6 }}
        ></motion.div>
      </div>
    </div>
  );
};

const CurrentTime = ({date}) => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date(date);
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const isAM = hours < 12;
      const formattedTime = `${hours % 12 || 12}:${minutes
        .toString()
        .padStart(2, "0")} ${isAM ? "AM" : "PM"}`;
      setTime(formattedTime);
    };

    updateTime(); // Set the initial time
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return <span className="text-xs text-gray-500">{time}</span>;
};
const Chat = () => {
  const [sendData, setSendData] = useState([]);
  const [receivedData, setReceivedData] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const [inputData, setInputData] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [hideSelection, setHideSelection] = useState(false);
  const [activeRoom, setActiveRoom] = useState("");
  const [arrayRoom, setArrayRoom] = useState([]);
  const [roomCollections,setRoomCollections]=useState([]);
  const [checkRoom,setCheckRoom]=useState(false);
  const [sender,setSender]=useState(null);
  const [showTyping,setShowTyping]=useState(false);
  const { showToast } = useToast();
  const router = useRouter();
  const socketRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const roomName = localStorage.getItem("myRoom");
     
      const roomName2 = localStorage.getItem("joinedRoom")
        ? JSON.parse(localStorage.getItem("joinedRoom")).roomName
        : null;
        
          const arrays=[
            {
                sender:roomName,
                receiver:null
            },
            { 
                 sender:null,
                receiver:roomName2
            }
          ]
          setRoomCollections((prev)=> [...prev,...arrays]);
      setArrayRoom([roomName, roomName2].filter(Boolean));
      setCheckRoom(true);
    }
  }, []);
  useEffect(()=>{
    const getDataBackEnd = async () => {
        try {
          const response = await axios.get(`${  process.env.NEXT_PUBLIC_DEPLOYBACKEND}/chat/messages/${activeRoom}`);
            const messages = response.data;
            const formattedMessages = messages.map((msg) => ({
                message: msg.message,
                owner: msg.sender === sender,
                time:msg.time
            }));
            console.log(formattedMessages);
            setCollectionData(formattedMessages);
        } catch (error) {
            console.error("Error fetching messages:", error);
            showToast("Failed to load messages", "error");
        }
    };
  if(activeRoom != ""){
    getDataBackEnd();
  }
  },[activeRoom]);
  useEffect(()=>{
  console.log("Sender");
  console.log(sender);
  },[sender])

  useEffect(() => {
    if (checkRoom && arrayRoom.length == 0) {
      showToast("You Have No Active Chat Room!", "warning");
      router.push("/join");
    }
  }, [checkRoom]);

  useEffect(() => {
    const socket = io(`${  process.env.NEXT_PUBLIC_DEPLOYBACKEND}/chat`);
   
    socket.on("new_message", (data) => {
      console.log("new message accessed");
      const newData = { message: data.message, owner: false};
      setReceivedData((prev) => [...prev, data.message]);
      setCollectionData((prev) => [...prev, newData]);
    });
    socketRef.current = socket;
    socketRef.current.emit("send_message", {
      receiver: "saboo",
      sender: sender,
      room: activeRoom,
      message: inputData,
    });
    
    socketRef.current.emit("typing",{room:activeRoom,typing:false});
    socket.on("typing",(data)=>{
      console.log("typing triggered");
      if(data){
        setShowTyping(true);
      }
      else{
        setShowTyping(false);
      }
    })
    const newData = { message: inputData, owner: true };
    setCollectionData((prev) => [...prev, newData]);
    setSendData((prev) => [...prev, inputData]);
    setInputData("");
    return () => {
      socket.off("new_message");
    };
  }, []);
  
  useEffect(()=>{
     if(inputData != ""){
      socketRef.current.emit("typing",{room:activeRoom,typing:true});
      // setShowTyping(true);
     }
     else{
      socketRef.current.emit("typing",{room:activeRoom,typing:false});
      // setShowTyping(false);
     }
  },[inputData]);

  const handleSendButton = () => {
    if (!inputData.trim()) return;

    socketRef.current.emit("send_message", {
      receiver: "saboo",
      sender: sender,
      room: activeRoom,
      message: inputData,
    });
    const newData = { message: inputData, owner: true };
    setCollectionData((prev) => [...prev, newData]);
    setSendData((prev) => [...prev, inputData]);
    setInputData("");
  };

  const handleSelect = (element,index) => {
    console.log("selected index:" , roomCollections[index]);
     if(roomCollections[index].sender != null){
        setSender("owner");
     }
     else{
        setSender("receiver");
     }
    setActiveRoom(element);
    setHideSelection(true);
    setShowChat(true);
  };

  return (
    <>
      {!hideSelection && (
        <SelectionComponent elements={arrayRoom}  onSelect={handleSelect} />
      )}
      {showChat && (
        <div className="flex flex-col h-screen bg-gray-100">
          <div className="bg-blue-500 text-white p-4">
            <h2 className="text-lg font-semibold">{activeRoom}</h2>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {collectionData.map((item, index) => (
              <div
                key={index}
                className={`mb-4 ${item.owner ? "text-right" : ""}`}
              >
                <div
                  className={`p-3 rounded-lg inline-block ${
                    item.owner ? "bg-blue-500" : "bg-black"
                  }`}
                >
                  <p className="text-white">{item.message}</p>
                  <span className="text-xs text-gray-500">
                  
                    <CurrentTime date={item.time || Date.now() } />
                  </span>
                </div>
              </div>
            ))}
          </div>
          {
            showTyping && (
              <TypingIndicator />
            )
          }
         
          <div className="p-4 bg-white flex">
            <input
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && inputData && handleSendButton()
              }
              type="text"
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 p-2 rounded-lg mr-2 text-blue-500 mb-40"
            />
            <button
              onClick={handleSendButton}
              className="bg-blue-500 max-h-12 text-white p-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
