"use client";
import React from 'react';
import { signOut } from 'next-auth/react';

const Dashboard = () => {
    const handleSignOut = () => {
        // Add sign-out logic here
        handleLogout();
        console.log('Sign out');
    };
    const handleLogout = async () => {
        await signOut({
          callbackUrl: "http://localhost:3000", // Redirect to homepage after logout
        });
      };
    const handleBack = () => {
        // Add back navigation logic here
        console.log('Go back');
    };

    const handleChat = (user) => {
        // Add chat logic here
        console.log(`Chat with ${user}`);
    };

    return (
        <div>
            <header>
                <h1>Dashboard</h1>
                <button onClick={handleSignOut}>Sign Out</button>
                <button onClick={handleBack}>Back</button>
            </header>
            <main>
                <h2>Welcome, [Your Name]</h2>
                <button onClick={() => handleChat('General')}>Chat</button>
                <div>
                    <h3>Users</h3>
                    <div>
                        <span>User 1</span>
                        <button onClick={() => handleChat('User 1')}>Chat</button>
                    </div>
                    <div>
                        <span>User 2</span>
                        <button onClick={() => handleChat('User 2')}>Chat</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;