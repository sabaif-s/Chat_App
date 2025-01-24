"use client"; // Ensure this component is client-rendered in Next.js

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/ToastContext";
import { motion,AnimatePresence} from "framer-motion";
import { useSocket } from '@/hooks/SocketContext';
 
import { FaCopy } from "react-icons/fa";
import axios from "axios";
import BackButton from "./button/BackButton";

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
   const [inputSearch,setInputSearch]=useState("");
   const [elementsNames,setElementsNames]=useState(elements);
   const [readyRender,setRenderReady]=useState(false);

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
   useEffect(()=>{
     console.log("inputSearch");
      const newElements=elements.filter((item)=>{
        return item.toLowerCase().startsWith(inputSearch.toLowerCase());
      })
      console.log("New Elements:",newElements);
      setElementsNames(newElements);
      
     
   },[inputSearch]);
   useEffect(()=>{
        
           if(elements){
            setElementsNames(elements);
            setRenderReady(true);
           }
   },[elements]);
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };
  const testArray=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

  return (
     <>
          {
            readyRender && (
              <motion.div
              style={{ width: "432px"}}
              className="h-full overflow-y-scroll relative py-12 px-4 rounded-[24px] scrollbar-thin scrollbar-thumb-green-100 scrollbar-track-blue-100  flex bg-gradient-to-b from-[#9747FF] via-blue-300 to-blue-200 bg-opacity-80 justify-start py-2 flex-col gap-y-4 custom-scrollbar"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
            <BackButton key={"back"} display={"relative"} />
              {/* Search Bar */}
              <motion.div
                className="bg-white rounded-lg flex px-2 justify-start items-center gap-x-2"
                variants={itemVariants}
              >
                <img src="/chat/search.png" className="w-10 h-10 object-cover" alt="" />
                <input
                value={inputSearch}
                onChange={(e)=>{
                  setInputSearch(e.target.value);
                }}
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
                    elementsNames.map((element,index)=>(
                      <motion.div
                      onClick={() => {
                        console.log("selected in child");
                        onSelect(element, index);
                      }}
                      key={index}
                      className="flex cursor-pointer text-gray-500 w-full border-b-2 border-gray-200 flex-row justify-between gap-x-2 items-center"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex flex-row items-center py-2 justify-start gap-x-2">
                        <img src="/chat/profile.png" className="w-12 h-12 object-cover" alt="" />
                        <div className="flex flex-col">
                          <span className="text-black text-lg">  {element}</span>
                          {/* <span className="text-gray-500 text-sm">April fool's day</span> */}
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        {/* <span>Today,9.52pm</span> */}
                        <img src="/chat/doubleThick.png" className="w-8 h-8" alt="" />
                      </div>
                    </motion.div>
                    ))
                  }
                 
                 
                </div>
              </motion.div>
            </motion.div>
            )
          }
    
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
  const [hideSelection, setHideSelection] = useState(true);
  const [activeRoom, setActiveRoom] = useState("");
  const [arrayRoom, setArrayRoom] = useState([]);
  const [roomCollections,setRoomCollections]=useState([]);
  const [checkRoom,setCheckRoom]=useState(false);
  const [sender,setSender]=useState(null);
  const [showTyping,setShowTyping]=useState(false);
  const [fetchBack,setFetchBack]=useState(0);
  const { showToast } = useToast();
  const router = useRouter();
  const socketRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { socket } = useSocket();
  console.log(socket);
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
  },[activeRoom,fetchBack]);
  useEffect(()=>{
  console.log("Sender");
  console.log(sender);
  },[sender])

  useEffect(() => {
    if (checkRoom && arrayRoom.length == 0) {
      showToast("You Have No Active Chat Room!", "warning");
      router.push("/join");
    }
    else{
      setHideSelection(false);
    }
  }, [checkRoom]);

  useEffect(() => {
    // const socket = io(`${  process.env.NEXT_PUBLIC_DEPLOYBACKEND}/chat`);
      
    
    if(socket){
      socket.on("new_message", (data) => {
        console.log("new message accessed");
        const newData = { message: data.message, owner: false};
        setReceivedData((prev) => [...prev, data.message]);
        setCollectionData((prev) => [...prev, newData]);
      });
      // socket.current = socket;
      socket.emit("send_message", {
        receiver: "saboo",
        sender: sender,
        room: activeRoom,
        message: inputData,
      });
      
      socket.emit("typing",{room:activeRoom,typing:false});
      socket.on("typing",(data)=>{
        console.log("typing triggered");
        if(data){
          if(collectionData.length == 0){
            setFetchBack((prev)=> prev+1);
          }
          setShowTyping(true);
        }
        else{
          setShowTyping(false);
        }
      })
      const newData = { message: inputData, owner: true };
      if(inputData != ""){
        setCollectionData((prev) => [...prev, newData]);
      }
      
      setSendData((prev) => [...prev, inputData]);
      setInputData("");
      return () => {
        socket.off("new_message");
      };
    }
  }, [socket]);
  useEffect(() => {
    // Scroll to the bottom of the chat container when collectionData changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", // Add smooth scrolling
      });
    }
  }, [collectionData, showTyping]);
  useEffect(()=>{
    if(socket){

    
     if(inputData != ""){
      socket.emit("typing",{room:activeRoom,typing:true});
      // setShowTyping(true);
     }
     else{
      socket.emit("typing",{room:activeRoom,typing:false});
      // setShowTyping(false);
     }
    }
  },[inputData,socket]);

  const handleSendButton = () => {
    if (!inputData.trim()) return;

    socket.emit("send_message", {
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
    setFetchBack((prev)=> prev+1);
    console.log("collection data:",collectionData);
    setShowChat(true);
  };

  return (
    <>
      {!hideSelection && (
        <SelectionComponent elements={arrayRoom}  onSelect={handleSelect} />
      )}
      {false && (
         <> 
        <div className="flex flex-col hidden h-screen hidden bg-gray-100 ">
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
       
       
       </>
      )}
       {
          showChat && (
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ width: "432px" }}
            className="md:rounded-[36px] relative h-full overflow-y-hidden overflow-x-hidden flex flex-col gap-y-4 px-4 pt-12 pb-36 bg-white"
          >
            {/* Header */}
            <div className="w-full flex  justify-start items-center gap-x-4 sticky z-50 top-0 h-10">
              <img
                onClick={() => {
                  setHideSelection(false);
                  setCollectionData([]);
                  setShowChat(false);
                }}
                src="/chat/close.png"
                className="w-10 h-10 object-cover cursor-pointer"
                alt=""
              />
              <span className="text-lg text-black font-semibold">{activeRoom}</span>
            </div>
      
            {/* Chat Messages */}
            <div
            ref={chatContainerRef}
            className="w-full flex flex-col overflow-y-auto scrollbar-hide gap-y-4">
              {collectionData.length > 0 &&
                collectionData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: item.owner ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut", delay: index * 0.1 }}
                    className="w-full flex relative justify-between items-center gap-x-2"
                  >
                    {item.owner ? (
                      // Owner's message
                      <div className="w-full flex justify-end items-center gap-x-2">
                        <div className="px-2 py-4 bg-[#FF7622] relative rounded-[12px]">
                          <span className="block word-break text-center px-4 overflow-x-hidden">
                            {item.message}
                          </span>
                          <img
                            src="/chat/doubleThick2.png"
                            className="w-2 h-3 z-50 absolute -bottom-4 -right-2"
                            alt=""
                          />
                          <div className="absolute left-4 -bottom-4 text-sm">
                            <span className="text-[#ABABAB] text-xs">
                              <CurrentTime date={item.time || Date.now()} />
                            </span>
                          </div>
                        </div>
                        <div className="w-10 h-10 bg-[#FFC6AE] rounded-full"></div>
                      </div>
                    ) : (
                      // Other user's message
                      <div className="w-full flex justify-start items-center gap-x-2">
                        <div className="w-10 h-10 bg-[#98A8B8] rounded-full"></div>
                        <div className="px-2 py-4 bg-[#F0F5FA] relative rounded-[12px]">
                          <span className="block word-break text-center text-[#32343E] px-4 overflow-x-hidden">
                            {item.message}
                          </span>
                          <div className="absolute right-4 -bottom-4 text-sm">
                            <span className="text-[#ABABAB] text-xs">
                              <CurrentTime date={item.time || Date.now()} />
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                {
            showTyping && (
              <TypingIndicator />
            )
          }
            </div>
      
            {/* Input Area */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className=" h-20 w-full px-6 z-40 absolute bottom-4 left-0"
            >
              <div className="w-full bg-[#F0F5FA] h-full rounded-lg px-2 flex justify-start items-center gap-x-2">
                <img src="/chat/emoji.png" className="w-6 h-6 object-cover cursor-pointer" alt="" />
                <div className="flex items-center w-full justify-center h-full">
                  <textarea
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (inputData) handleSendButton();
                      }
                    }}
                    name=""
                    placeholder="Write something"
                    className="outline-none h-2/3 w-full px-4 pt-4 text-[#ABABAB] text-sm rounded-lg border-2 bg-gray-800 word-break bg-white bg-opacity-0 transition duration-200 ease-in-out resize-none"
                    id=""
                    rows="1"
                  />
                </div>
                <img
                  onClick={handleSendButton}
                  src="/chat/sendBtn.png"
                  className="w-10 h-10 object-cover cursor-pointer"
                  alt=""
                />
              </div>
            </motion.div>
          </motion.div>
      
          )
        }
    </>
  );
};

export default Chat;
