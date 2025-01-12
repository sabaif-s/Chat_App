"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';


const RegisterComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/register", {
                username,
                password,
                email
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, // Ensure credentials (cookies) are sent with the request
            });

            console.log(response.data);
            if(response.data){
                const res = await signIn("credentials", {
                    redirect: false, // Prevent automatic redirection
                    username: username,
                    password: password,
                    saved:true
                  });
              
                  if (res.error) {
                    console.log("error during signin users");
                      console.log(res.error);
                  } else {
                    localStorage.setItem("registeredUser",username);
                    window.location.href = "/dashboard"; // Redirect on success
                  }
            }
             
            // alert("Registration successful!");
        } catch (error) {
            if (error.response) {
                const status = error.response.status; // HTTP status code (e.g., 400)
                const message = error.response.data.message; // The message from the response (e.g., 'User already exists')
                if(status == 400){
                    console.log("User Exist With This Username");
                }
                console.error(`Error ${status}: ${message}`);
                // alert(message); 
        
              } else {
                // If no response, it might be a network error or timeout
                console.error("Network error or timeout:", error.message);
                alert("An error occurred, please try again.");
              }
            console.error(error);
            alert("Registration failed!");
        }
    };

    return (
        <div className='w-full h-screen flex flex-col gap-y-4 bg-red-100'>
            <input
                type="text"
                name="username"
                className='text-red-400'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                name="password"
                className='text-green-300'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                name="confirm"
                className='text-green-300'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
                type="email"
                name="email"
                className='text-blue-300'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                onClick={handleRegister}
                className='bg-blue-500 text-white p-2 rounded-lg'
            >
                Register
            </button>
        </div>
    );
};

export default RegisterComponent;