"use client";
import {useState, useRef } from "react";
import LandingPage from "@/components/Landing/Landing";
export default function Home() {
  const socketRef = useRef(null);
  const [heightState,setHeightState]=useState(null);
   
  return (
    <>
    <div className="w-full h-full flex justify-center" >
        <div className="w-full h-full md:py-4 flex justify-center" >
        <LandingPage key={"landing"} height={heightState} />
        </div>
   </div>
    </>
  );
}
