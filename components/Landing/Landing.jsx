"use client";
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const typingAnimation = {
    hidden: { width: "auto" },
    visible: {
        width: "auto",
        transition: {
            type: "spring",
            stiffness: 50,
            delay: 0.5,
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
    const controls = useAnimation();

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
        <div className='w-full h-screen bg-fuchsia-500 flex flex-col items-center justify-around overflow-hidden' style={{ perspective: "1000px" }}>
            <motion.div
                className='flex flex-col gap-y-4 items-center'
                initial="hidden"
                animate="visible"
                variants={fadeIn(0.5)}
            >
                <span className='text-gray-200 text-2xl'>TECHNOLOGY</span>
                <span className='text-4xl font-bold text-white tracking-wider'>ONLINE CHAT</span>
                <div className='w-20 h-1 bg-white'></div>
            </motion.div>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn(1)}
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
                        className="w-32 h-auto transform transition-transform duration-500 absolute top-2 left-2 object-cover"
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 1.5, duration: 1 }}
                    />
                    <motion.img
                        src="/landing/chat2.jpg"
                        alt=""
                        className="w-32 h-auto transform transition-transform duration-500 absolute top-20 right-2 object-cover"
                        initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 2, duration: 1 }}
                    />
                    <motion.img
                        src="/landing/chat3.jpg"
                        alt=""
                        className="w-32 h-20 transform transition-transform duration-500 absolute top-40 left-2 object-cover"
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 2.5, duration: 1 }}
                    />
                    {/* <div className='absolute -top-80 flex justify-center'>
                        <img
                            src="/landing/messageWriter.jpg"
                            alt=""
                            className="w-full h-auto transform transition-transform duration-500 object-cover"
                        />
                        <motion.div
                            className='bg-red-300 absolute top-14 rounded-lg bg-opacity-10 p-4 flex justify-center items-center z-20'
                            style={{ width: "62%", height: "64%" }}
                            initial="hidden"
                            animate={controls}
                        >
                            <motion.span
                                className='text-red-400 w-full text-center word-break'
                                initial="hidden"
                                animate="visible"
                                variants={typingAnimation}
                            >
                                Hi Guys! How Are You Is Everything Cool
                            </motion.span>
                        </motion.div>
                    </div> */}
                </div>
            </motion.div>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn(2)}
            >
                Description
            </motion.div>
        </div>
    );
};

export default LandingPage;