"use client";
import React, { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client";

const Chat = () => {
    const [sendData, setSendData] = useState([]);
    const [receivedData, setReceivedData] = useState([]);
    const [collectionData,setCollectionData]=useState([]);
    const [inputData, setInputData] = useState("");
    const socketRef = useRef(null);
   const roomName=localStorage.getItem("myRoom");
    useEffect(() => {
        const socket = io("http://localhost:3001/chat");
        // socket.emit("register_chats", { firstUser: "biiftuu", secondUser: "saboo" });
        socket.on("new_message", (data) => {
            console.log(data);
            const newData={
                message:data.message,
                owner:false
            }
            setReceivedData((prevData) => [...prevData, data.message]);
            setCollectionData((prev)=> [...prev,newData ]);
        });
        socketRef.current = socket;
        return () => {
            socket.off("new_message");
        };
    }, []);
// useEffect(()=>{
// setCollectionData([...receivedData,...sendData]);

// },[receivedData,sendData]);
console.log("collection data:",collectionData);
    const handleSendButton = () => {
        console.log(socketRef.current);
        socketRef.current.emit("send_message", { receiver: "saboo", sender: "biiftuu", message: inputData });
        const newData={
          message:inputData,
          owner:true
        }
        setCollectionData((prev)=>[...prev,newData]);

        setSendData((prevData) => [...prevData, inputData]);
        setInputData("");
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="bg-blue-500 text-white p-4">
                <h2 className="text-lg font-semibold">{roomName || "chat"}</h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
            {/* <div  className="mb-4">
                            <div className="bg-black p-3 rounded-lg inline-block">
                                <p className='text-white'>HELLO </p>
                                <span className="text-xs text-gray-500">10:00 AM</span>
                            </div>
                        </div> */}
                    {
                        collectionData.map((item,index)=>(
                            <div key={index} className={` ${item.owner == true ? "text-right":""} mb-4`}>
                            <div className={` ${item.owner == true ? "bg-blue-500":"bg-black"} p-3 rounded-lg inline-block`}>
                                <p className='text-white'>{item.message}</p>
                                <span className="text-xs text-gray-500">10:00 AM</span>
                            </div>
                        </div>
                        ))
                    }
                {
                    // receivedData.map((item, index) => (
                    //     <div key={index} className="mb-4">
                    //         <div className="bg-black p-3 rounded-lg inline-block">
                    //             <p className='text-white'>{item}</p>
                    //             <span className="text-xs text-gray-500">10:00 AM</span>
                    //         </div>
                    //     </div>
                    // ))
                }
                 {/* <div className="mb-4 text-right">
                            <div className="bg-blue-500 text-white p-3 rounded-lg inline-block">
                                <p>I am Fine</p>
                                <span className="text-xs text-gray-200">10:01 AM</span>
                            </div>
                        </div> */}
                {
                    // sendData.map((item, index) => (
                    //     <div key={index} className="mb-4 text-right">
                    //         <div className="bg-blue-500 text-white p-3 rounded-lg inline-block">
                    //             <p>{item}</p>
                    //             <span className="text-xs text-gray-200">10:01 AM</span>
                    //         </div>
                    //     </div>
                    // ))
                }
            </div>
            <div className="p-4 bg-white flex">
                <input
                    value={inputData}
                    onChange={(e) => {
                        setInputData(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        console.log("key down", e.key);
                        if (e.key === "Enter" && inputData !== "") {
                            handleSendButton();
                        }
                    }}
                    type="text" placeholder="Type a message..." className="flex-1 border border-gray-300 p-2 rounded-lg mr-2" />
                <button
                    onClick={handleSendButton}
                    className="bg-blue-500 text-white p-2 rounded-lg">Send</button>
            </div>
        </div>
    );
};

export default Chat;