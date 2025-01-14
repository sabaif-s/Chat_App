"use client"; // Ensure this component is client-rendered in Next.js

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/ToastContext";
import { motion } from "framer-motion";
import { io } from "socket.io-client";

const SelectionComponent = ({ elements, onSelect }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {elements.map((element, index) => (
      <motion.div
        key={index}
        className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(element)}
      >
        <h3 className="text-lg font-semibold text-gray-800">{element}</h3>
        <p className="text-gray-600 mt-2">{element}</p>
      </motion.div>
    ))}
  </div>
);

const Chat = () => {
  const [sendData, setSendData] = useState([]);
  const [receivedData, setReceivedData] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const [inputData, setInputData] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [hideSelection, setHideSelection] = useState(false);
  const [activeRoom, setActiveRoom] = useState("");
  const [arrayRoom, setArrayRoom] = useState([]);
  const [checkRoom,setCheckRoom]=useState(false);
  const { showToast } = useToast();
  const router = useRouter();
  const socketRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const roomName = localStorage.getItem("myRoom");
      const roomName2 = localStorage.getItem("joinedRoom")
        ? JSON.parse(localStorage.getItem("joinedRoom")).roomName
        : null;
      setArrayRoom([roomName, roomName2].filter(Boolean));
      setCheckRoom(true);
    }
  }, []);

  useEffect(() => {
    if (checkRoom && arrayRoom.length == 0) {
      showToast("You Have No Active Chat Room!", "warning");
      router.push("/join");
    }
  }, [checkRoom]);

  useEffect(() => {
    const socket = io("http://localhost:3001/chat");
    socket.on("new_message", (data) => {
      const newData = { message: data.message, owner: false };
      setReceivedData((prev) => [...prev, data.message]);
      setCollectionData((prev) => [...prev, newData]);
    });
    socketRef.current = socket;
    return () => {
      socket.off("new_message");
    };
  }, []);

  const handleSendButton = () => {
    if (!inputData.trim()) return;

    socketRef.current.emit("send_message", {
      receiver: "saboo",
      sender: "biiftuu",
      room: activeRoom,
      message: inputData,
    });
    const newData = { message: inputData, owner: true };
    setCollectionData((prev) => [...prev, newData]);
    setSendData((prev) => [...prev, inputData]);
    setInputData("");
  };

  const handleSelect = (element) => {
    setActiveRoom(element);
    setHideSelection(true);
    setShowChat(true);
  };

  return (
    <>
      {!hideSelection && (
        <SelectionComponent elements={arrayRoom} onSelect={handleSelect} />
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
                  <span className="text-xs text-gray-500">10:00 AM</span>
                </div>
              </div>
            ))}
          </div>
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
