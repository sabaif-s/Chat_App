"use client";
import React,{useContext,useEffect,useState,createContext} from 'react'
const Context=createContext();
function  LandingContext({children}) {
     const [animateStart,setAnimateStart]=useState(false);
        const [displayedText, setDisplayedText] = useState('');
        const [animateInButton,setAnimateInButton]=useState(false);
        const [animateOutTop,setAnimateOutTop]=useState(false);
          const fullText = "Join now and chat with friends, make new ones, and stay in the loop—let's get talking!"
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
          
              return () => {
                clearInterval(typingInterval);
                console.log("Context Unmounted");
                

              } ; // Cleanup interval on unmount
            }
          }, [animateStart]);
         
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
  return (
    <Context.Provider
    value={{
      displayedText
    }}
  >
    {children}
  </Context.Provider>
  )
}

export default  LandingContext;
export const ContextData = () => useContext(Context)