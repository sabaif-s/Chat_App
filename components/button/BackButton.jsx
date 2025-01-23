"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back(); // Go back in history
    } else {
      router.push("/"); // Fallback to homepage
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}  
      whileTap={{ scale: 0.9 }} 
      className="flex items-center justify-center absolute top-4 left-4 w-32 h-12 bg-blue-500 text-white rounded-md shadow-md cursor-pointer"
      onClick={handleBack}
    >
      Back
    </motion.div>
  );
};

export default BackButton;
