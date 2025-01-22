"use client";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import LandingPage from "@/components/Landing/Landing";

export default function Home() {
  const socketRef = useRef(null);
  const [startChat, setStartChat] = useState(false);
  const [user1Input, setUser1Input] = useState("");
  const [user2Input, setUser2Input] = useState("");
  const [socketId, setSocketId] = useState(null);
   const [user,setUser]=useState(null);
   const [heightState,setHeightState]=useState(null);
  

  
  // Function to initialize socket connection when startChat is true
  useEffect(() => {
     
      socketRef.current = io(  process.env.NEXT_PUBLIC_DEPLOYBACKEND);

      // Listen for the 'connect' event to get the socket ID
      const socket = socketRef.current;
      const updateSocketId = () => {
        console.log(`Socket connected with ID: ${socket.id}`);
        setSocketId(socket.id);
      };
      
      socket.on("connect", updateSocketId);
      socket.on("reconnect", () => {
        console.log("Reconnected to server.");
        updateSocketId();
      });

      // Handle received messages
      socket.on("user1_message", (data) => {
        console.log("Received message from user1:", data);
      });
      socket.on("user2_message", (data) => {
        console.log("Received message from user2:", data);
      });

      // Cleanup function when startChat is false
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;  // Cleanup the socket instance
        }
      };
    

    
  }, []);
  useEffect(()=>{
  console.log(window.innerHeight);
  setHeightState(window.innerHeight);
  },[]);
 
  const handleBtnClicked = () => {
    setStartChat(!startChat); // Toggle chat state when button is clicked
  };

  const handleUser1Input = (e) => {
    setUser1Input(e.target.value);
  };

  const handleUser2Input = (e) => {
    setUser2Input(e.target.value);
  };

  const handleUser1Message = (e) => {
    if (e.key === "Enter" && user1Input.trim() !== "") {
      socketRef.current.emit("user1_message", { message: user1Input, sender: "userOne",receiver:"userTwo" });
      setUser1Input("");  // Reset the input field after sending the message
    }
  };

  const handleUser2Message = (e) => {
    if (e.key === "Enter" && user2Input.trim() !== "") {
      socketRef.current.emit("user1_message", { message: user2Input, sender: "userTwo",receiver:"userOne" });
      setUser2Input("");  // Reset the input field after sending the message
    }
  };

  return (
    <>
    <div className="w-full h-full flex justify-center" >

    
      {heightState !== null ? (
        <div className="w-full h-full md:py-4 flex justify-center" >
        <LandingPage height={heightState} />
        </div>
      ) : null}
   
   {
    false && (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={handleBtnClicked}>
        {startChat ? "STOP CHAT" : "START CHAT"}
      </button>
         {
          startChat && (
            <div className="flex gap-x-4">
              <div
               onClick={()=>{
                setUser("first_user");
                socketRef.current.emit("register",{user:"First_User"})
               }}
              className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A9.003 9.003 0 0112 15c2.21 0 4.21.896 5.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>User 1</span>
              </div>
              <div
               onClick={()=>{
                setUser("second_user");
                socketRef.current.emit("register",{user:"Second_User"})
               }}
              className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A9.003 9.003 0 0112 15c2.21 0 4.21.896 5.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>User 2</span>
              </div>
            </div>
          )
         }
      {startChat && user && (
        <div className="flex gap-x-2">
          <input
            type="text"
            value={user1Input}
             
            onKeyDown={handleUser1Message}
            onChange={handleUser1Input}
            className={`${user == "first_user" ? "":"hidden"} "text-red-300"`}
            placeholder="User 1 message"
          />
          <input
            type="text"
            value={user2Input}
            className={`${user == "second_user" ? "":"hidden"} "text-red-300"`}
            onKeyDown={handleUser2Message}
            onChange={handleUser2Input}
            placeholder="User 2 message"
          />
        </div>
      )}

      {socketId && <p>Socket ID: {socketId}</p>}
    </div>
    )
   }
   </div>
    </>
  );
}
