"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/ToastContext";
import { io } from "socket.io-client";

const Chat = () => {
    const [sendData, setSendData] = useState([]);
    const [receivedData, setReceivedData] = useState([]);
    const [collectionData, setCollectionData] = useState([]);
    const [inputData, setInputData] = useState("");
    const [showChat,setShowChat]=useState(false);
    const { showToast } = useToast();
    const router = useRouter();
    const socketRef = useRef(null);

    const roomName = typeof window !== "undefined" ? localStorage.getItem("myRoom") : null;
    let roomName2 =
        typeof window !== "undefined" && localStorage.getItem("joinedRoom") != null
            ? JSON.parse(localStorage.getItem("joinedRoom")).roomName
            : null;

    useEffect(() => {
        if (!roomName && !roomName2) {
            showToast("You Have No Active Chat Room!", "warning");
            router.push("/join"); // Navigate after the component is mounted
        }
        else{
            setShowChat(true);
        }
    }, [roomName, roomName2, showToast, router]);

    useEffect(() => {
        const socket = io("http://localhost:3001/chat");
        socket.on("new_message", (data) => {
            console.log(data);
            const newData = {
                message: data.message,
                owner: false,
            };
            setReceivedData((prevData) => [...prevData, data.message]);
            setCollectionData((prev) => [...prev, newData]);
        });
        socketRef.current = socket;
        return () => {
            socket.off("new_message");
        };
    }, []);

    const handleSendButton = () => {
        socketRef.current.emit("send_message", {
            receiver: "saboo",
            sender: "biiftuu",
            message: inputData,
        });
        const newData = {
            message: inputData,
            owner: true,
        };
        setCollectionData((prev) => [...prev, newData]);
        setSendData((prevData) => [...prevData, inputData]);
        setInputData("");
    };

    return (
        <>
        {
            showChat && (
                <div className="flex flex-col h-screen bg-gray-100">
                <div className="bg-blue-500 text-white p-4">
                    <h2 className="text-lg font-semibold">{roomName || roomName2}</h2>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                    {collectionData.map((item, index) => (
                        <div
                            key={index}
                            className={`${
                                item.owner ? "text-right" : ""
                            } mb-4`}
                        >
                            <div
                                className={`${
                                    item.owner ? "bg-blue-500" : "bg-black"
                                } p-3 rounded-lg inline-block`}
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && inputData !== "") {
                                handleSendButton();
                            }
                        }}
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 border border-gray-300 p-2 rounded-lg mr-2"
                    />
                    <button
                        onClick={handleSendButton}
                        className="bg-blue-500 text-white p-2 rounded-lg"
                    >
                        Send
                    </button>
                </div>
            </div>
            )
        }
       
        </>
    );
};

export default Chat;
