"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const DraggableCircle = ({room,link}) => {
    const router=useRouter();
  return (
    <div className="flex items-center absolute bottom-2 justify-center">
      {/* Draggable Circle */}
      <motion.div
      onClick={()=>{
                   router.push(link);
      }}
        className=" w-40 aspect-square bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white text-lg font-semibold cursor-grab"
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        whileDrag={{ scale: 1.2, rotate: 10 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {room}
      </motion.div>
    </div>
  );
};

export default DraggableCircle;
