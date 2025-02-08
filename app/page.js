"use client";
import {useState } from "react";
import LandingPage from "@/components/Landing/Landing";
export default function Home() {
  
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
