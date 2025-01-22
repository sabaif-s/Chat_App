import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ToastProvider } from '@/hooks/ToastContext';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      style={{backgroundImage:`url(/landing/chat.jpg)` , backgroundSize:"cover" ,backgroundPosition:"center" }} 
      className="w-full h-screen flex justify-center md:py-4">
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
      </body>
    </html>
  );
}
