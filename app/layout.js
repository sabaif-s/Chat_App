import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ToastProvider } from '@/hooks/ToastContext';
import { SocketProvider } from '@/hooks/SocketContext';
import LandingContext from '@/hooks/LandingContext';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      style={{backgroundImage:`url(/landing/chat.jpg)` , backgroundSize:"cover" ,backgroundPosition:"center" }} 
      className="w-full h-screen overflow-hidden flex items-end justify-center md:py-4">
        <LandingContext>
    
           <SocketProvider>
        <ToastProvider>
          {children}

          {/* Toast container without built-in styles */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className="z-50" // Ensure it renders above other elements
          />
        </ToastProvider>
        </SocketProvider>
        </LandingContext>
      </body>
    </html>
  );
}
