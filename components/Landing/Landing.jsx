"use client";
import React, { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import { easeInOut, motion, useAnimation } from 'framer-motion';
import data from "./Data.json";


const typingAnimation = {
    hidden: { width: "auto" },
    visible: {
        width: "auto",
        transition: {
            type: "spring",
            stiffness: 50,
            delay: 12.5,
            duration: 2,
        },
    },
};

const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay,
            duration: 1,
        },
    },
});

const LandingPage = () => {
    const router=useRouter();
    const controls = useAnimation();
    const [animateStart,setAnimateStart]=useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const [animateInButton,setAnimateInButton]=useState(false);
    const [animateOutTop,setAnimateOutTop]=useState(false);
    
    const [smallMobile,setSmallMobile]=useState(false);
    
  const fullText = data.messages.displayText;
   
  useEffect(() => {
    if (animateStart) { // Run only if animateStart is true
      let currentIndex = 0;
  
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length - 1) {
          setDisplayedText((prev) => prev + fullText[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50); // Adjust typing speed
  
      return () => clearInterval(typingInterval); // Cleanup interval on unmount
    }
  }, [animateStart]);
  // useEffect(()=>{
  //     if(height < 700){
  //       setScreenDetected(true);
  //       setSmallMobile(true);
  //     }
  //     else{
  //       setScreenDetected(true);
  //       setSmallMobile(false);
  //     }
  // },[height]);
    useEffect(()=>{
        setTimeout(() => {
            setAnimateOutTop(true);
           },4000);
     setTimeout(() => {
       setAnimateStart(true);
       
       setTimeout(() => {
         setAnimateInButton(true);
       }, (3000));
     },  5000);
 },[]);
 const fadeInTwo = (duration) => ({
    visible: { opacity: 1, y: 0, transition: { duration } },
    hidden: { opacity: 0, y: -50, transition: { duration: 0.5 } }, // Slide out and fade out
  });
    useEffect(() => {
        const sequence = async () => {
            await controls.start(fadeIn(10)); // Delay for 10 seconds
            controls.start({
                opacity: 1,
                transition: { duration: 1 },
            });
        };
        sequence();
    }, [controls]);

    return (
        <>
        
        {
            true && (
            
                <div style={{width:"430px"}} className={`h-full md:rounded-[36px]  bg-fuchsia-500 flex flex-col items-center ${false ? "justify-end gap-y-12":"justify-around"} overflow-hidden`}>
                <motion.div
         className="flex flex-col gap-y-4 items-center"
         initial="hidden"
         animate={animateOutTop ? "hidden" : "visible"} // Switch animation based on state
         variants={fadeInTwo(0.5)}
       >
         <span className="text-gray-200 text-2xl">{data.header.title}</span>
         <span className="text-4xl font-bold text-white tracking-wider">{data.header.subtitle}</span>
         <div className="w-20 h-1 bg-white"></div>
       </motion.div>
             <motion.div
                 initial="hidden"
                 animate="visible"
                 variants={fadeIn(2)}
             >
                 <div
                     className="w-full h-full relative transform scale-50 transition-transform duration-500 hover:scale-100"
                     style={{
                         transform: "translateZ(-500px)",
                         transition: "transform 0.5s ease-in-out",
                     }}
                 >
                     <motion.img
                         src="/landing/mobile2.jpg"
                         alt=""
                         className="w-full h-auto transform transition-transform duration-500 object-cover"
                         initial={{ x: -100 }}
                         animate={{ x: 0 }}
                         transition={{ delay: 1, duration: 1 }}
                     />
                     <motion.img
                         src="/landing/chat1.jpg"
                         alt=""
                         className={` ${smallMobile ? "w-24":"w-32"} h-auto transform transition-transform duration-500 absolute top-2 left-2 object-cover`}
                         initial={{ opacity:0, scale:0.9 }}
                         animate={{ opacity:1,scale:1 }}
                         transition={{ delay: 2.5, duration: 2 , ease:"easeInOut" }}
                     />
                     <motion.img
                         src="/landing/chat2.jpg"
                         alt=""
                         className={` ${smallMobile ? "w-24 top-20":"w-32 top-20"} h-auto transform transition-transform duration-500 absolute  right-2 object-cover`}
                         initial={{ opacity:0, scale:0.9 }}
                         animate={{ opacity:1,scale:1 }}
                         transition={{ delay: 2.5, duration: 2 , ease:"easeInOut" }}
                     />
                     <motion.img
                         src="/landing/chat3.jpg"
                         alt=""
                         className={` ${smallMobile ? "w-24 top-32":"w-32 top-40"}  h-20 transform transition-transform duration-500 absolute  left-2 object-cover`}
                         initial={{ opacity:0, scale:0.9 }}
                         animate={{ opacity:1,scale:1 }}
                         transition={{ delay: 2.5, duration: 2 , ease:"easeInOut" }}
                     />
                     {
                         animateStart && (
                             <div className={` ${smallMobile ? "-top-64":"-top-80"} absolute  flex justify-center w-full`}>
                     <motion.img
                          src="/landing/messageWriter.jpg"
                         alt=""
                         className="w-2/3 h-auto transform rounded-lg transition-transform duration-500 object-cover" 
                         initial={{ opacity:0, scale:0.9 }}
                         animate={{ opacity:1,scale:1 }}
                         transition={{ delay: 1, duration: 2 , ease:"easeInOut" }}
                     />
      <div className=''>
   <motion.img
     src="/landing/sabk.jpeg"
     className='rounded-full absolute w-16 h-16 -bottom-10'
     alt=""
     initial="hidden"
     animate={{
       y: [0, -10, 0], // Float effect
     }}
     transition={{
       duration: 2, // Time for one cycle
       repeat: 2, // Repeat the animation 2 times
       repeatType: "loop", // Ensure it loops for the specified repeats
       ease: "easeInOut", // Smooth transition
     }}
   />
 </div>               
 <motion.div
       className='bg-red-300 absolute top-14 rounded-lg bg-opacity-10 pb-4 px-12 flex justify-center items-center z-20'
       style={{ width: "56%", height: "64%" }}
       initial="hidden"
       animate="visible"
     >
       <motion.span
         className='text-red-400 text-sm w-full text-center word-break'
         initial="hidden"
         animate="visible"
       >
         {displayedText}
       </motion.span>
     </motion.div>
                     </div>
                         )
                     }
                     {
                         animateInButton && (
                             <motion.div
                             style={{transformStyle:"flat"}}
             className="flex w-full justify-center absolute z-50 -bottom-20 items-center space-x-4"
             initial={{ opacity: 0, y: 50 }} // Start: hidden and below
             animate={{ opacity: 1, y: 0 }}  // End: visible and in place
             transition={{ duration: 0.8, ease: "easeInOut" }} // Smooth transition
           >
             <button
             onClick={()=>{
              console.log("clicked Chat");
                router.push("/join");
             }}
             className="bg-blue-500 relative z-50 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
               JOIN
             </button>
             <button
             onClick={()=>{
              console.log("clicked Chat");
                router.push("/chat");
             }}
             className="bg-orange-500 relative z-50 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
               CHAT
             </button>
             <button
             onClick={()=>{
               console.log("clicked");
               router.push("/create");
             }}
             className="bg-green-500 relative z-50 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
               CREATE
             </button>
           </motion.div>
                         )
                     }
                     
                 </div>
             </motion.div>
             <motion.div
                 initial="hidden"
                 animate="visible"
                 variants={fadeIn(2)}
                 className='px-4'
             >
               <span className={` ${smallMobile ? "text-lg":"text-2xl"} text-gray-200 word-break `} > {data.header.description}</span>   
             </motion.div>
         </div>
            )
        }
       </>
    );
};

export default LandingPage;